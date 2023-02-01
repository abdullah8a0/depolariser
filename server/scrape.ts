// use jsdom to parse HTML
import { InfoCard } from "../shared/common";
const SUMMARISER_DELAY = 5000;
const JSDOM = require("jsdom").JSDOM;
/**
 * It takes a body of text and returns a summary of the text.
 * Uses MeaningCloud's summarisation API.
 *
 * @param {string} body - The body of the article to summarise.
 */
async function summarise(body: string): Promise<string> {
  const url = "https://api.meaningcloud.com/summarization-1.0";
  const lisence = "d3c0989919888bffbbb4271e5810ae14";
  console.log(`summarising: ${body.slice(0, 100)}`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `key=${lisence}&txt=${body}&sentences=5`,
  });
  const copyRes = res.clone();
  try {
    const jsonResult = await res.json();
    console.log(`summariser response: ${jsonResult.status.code} ${jsonResult.status.msg}`);
    return jsonResult.summary;
  } catch (error) {
    console.log(error);
    console.log(`res: ${await copyRes.text()}`);
    console.log(`res.status: ${copyRes.status}`);
    console.log(`res.statusText: ${copyRes.statusText}`);
    // if status === 202 ||104 then try again in 5 seconds
    if (copyRes.status === 200 || copyRes.status === 104) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await fallbackSummarise(body));
        }, 5000);
      });
    }
    // return the first 3 sentences of the body
    return body.split(".").slice(0, 3).join(".");
  }
}

async function fallbackSummarise(body: string): Promise<string> {
  const url = "https://api.meaningcloud.com/summarization-1.0";
  const lisence = "d3c0989919888bffbbb4271e5810ae14";
  console.log(`summarising: ${body.slice(0, 100)}`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `key=${lisence}&txt=${body}&sentences=5`,
  });
  const copyRes = res.clone();
  try {
    const jsonResult = await res.json();
    console.log(`summariser response: ${jsonResult.status.code} ${jsonResult.status.msg}`);
    return jsonResult.summary;
  } catch (error) {
    console.log(error);
    console.log(`res: ${await copyRes.text()}`);
    console.log(`res.status: ${copyRes.status}`);
    console.log(`res.statusText: ${copyRes.statusText}`);
    // just return the first 3 sentences of the body
    return body.split(".").slice(0, 3).join(".");
  }
}

async function parseCNN(category: string): Promise<InfoCard[]> {
  console.log("parsing CNN");
  const fecthBody = async (url: string): Promise<string> => {
    const res = await fetch("https://www.cnn.com" + url).then((res) => res.text());
    const { window } = new JSDOM();
    const { document } = window;
    document.body.innerHTML = res;
    const body = document.querySelectorAll("p.paragraph");

    const innerText = Array.from(body)
      .map((p) => {
        return (p as HTMLElement).textContent;
      })
      .join(" ");
    // remove extra spaces
    return innerText.replace(/\s+/g, " ");
  };

  const CNN = "https://www.cnn.com/" + category;
  // find div.container__headline in the response HTML
  const res = await fetch(CNN).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const links: NodeList = document.querySelectorAll("a.container__link");

  const promisedDescCards = Array.from(links)
    .map((link: Node): InfoCard => {
      const url = (link as HTMLElement).getAttribute("href");
      const title = (link as HTMLElement).querySelector("div.container__headline")?.textContent;
      const img = (link as HTMLElement).querySelector("img")?.getAttribute("src");
      if (title && url) {
        return { title: title.replace(/\s\s+/g, " "), url, img: img ? img : "NoImg", desc: "" };
      }
      return { title: "", url: "/video", img: "", desc: "" };
    })
    .filter((card) => {
      return !card.url.startsWith("/video") && !card.url.match("gallery");
    })
    .map(async (card, i) => {
      // set timeout to avoid being blocked by the server for too many requests
      // timeout is set to 1s*index.
      const desc: string = await fecthBody(card.url).then(
        (body) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(summarise(body));
            }, SUMMARISER_DELAY * i);
          })
      );

      return { title: card.title, url: `https://www.cnn.com${card.url}`, img: card.img, desc: desc };
    });

  return Promise.all(promisedDescCards);
}

async function parseFOX(category: string): Promise<InfoCard[]> {
  const fecthBody = async (url: string): Promise<string> => {
    const res = await fetch("https://www.foxnews.com" + url).then((res) => res.text());
    const { window } = new JSDOM();
    const { document } = window;
    document.body.innerHTML = res;
    const body = document.querySelectorAll("p.speakable");

    const innerText = Array.from(body)
      .map((p) => {
        return (p as HTMLElement).textContent;
      })
      .join(" ");
    // remove extra spaces
    return innerText.replace(/\s\s+/g, " ");
  };
  const FOX = "https://www.foxnews.com/" + category;
  // find h2.title 's child a in the response HTML
  const res = await fetch(FOX).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const articles: NodeList = document.querySelectorAll("article.article");
  const promisedDescCards = Array.from(articles)
    .map((article: Node): InfoCard => {
      const title = (article as HTMLElement).querySelector("h2.title, h3.title, h4.title");
      const img = (article as HTMLElement).querySelector("div.m > a > img");
      const link = (title as HTMLElement).querySelector("a");
      const desc = "";
      if (link && title) {
        return { title: title?.textContent!, url: link.getAttribute("href")!, img: img ? img.getAttribute("src")! : "NoImg", desc };
      }
      return { title: title?.textContent!, url: "", img: "", desc: "" };
    })
    .filter((card) => {
      return card.url.startsWith(`/${category}`);
    })
    .map(async (card, i) => {
      // set timeout to avoid being blocked by the server for too many requests
      // timeout is set to 1s*index.
      let desc: string = await fecthBody(card.url).then(
        (body) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(summarise(body));
            }, SUMMARISER_DELAY * i);
          })
      );
      return { title: card.title, url: `https://www.foxnews.com${card.url}`, img: card.img, desc: desc };
    });
  return Promise.all(promisedDescCards);
}

async function parseAPP(category: string): Promise<InfoCard[]> {
  const BASE_URL = "https://www.apnews.com";
  const fecthBody = async (url: string): Promise<string> => {
    const res = await fetch(BASE_URL + url).then((res) => res.text());
    const { window } = new JSDOM();
    const { document } = window;
    document.body.innerHTML = res;
    const body = document.querySelectorAll("div.Article > p.p");

    const innerText = Array.from(body)
      .map((p) => {
        return (p as HTMLElement).textContent;
      })
      .join(" ");
    // remove extra spaces
    return innerText.replace(/\s\s+/g, " ");
  };
  const APPress = BASE_URL + "/hub/" + category;
  // find h2.title 's child a in the response HTML
  const res = await fetch(APPress).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const dataObject = res.match(/\nwindow\['titanium-state'\] = .*\n/)?.map((s) => s.trim());

  // console.log(`matched: ${dataObject?.length} head: ${dataObject?.[0]}`);
  const data = JSON.parse(dataObject![0].split("=")[1].trim() + "}");

  console.log(JSON.stringify(data, null, 2));

  const articles: NodeList = document.querySelectorAll("div.FeedCard");
  const promisedDescCards = Array.from(articles)
    .map((article: Node): InfoCard => {
      const title = (article as HTMLElement).querySelector("div > a > h2");
      const img = (article as HTMLElement).querySelector("a > div > img");
      const link = (article as HTMLElement).querySelector("div > a");
      console.log(`img: ${(article as HTMLElement).querySelector("div[data-key='media-placeholder']>img")?.getAttribute("src")}`);

      const desc = "";
      if (link && title) {
        return { title: title?.textContent!, url: link.getAttribute("href")!, img: img ? img.getAttribute("src")! : "NoImg", desc };
      }
      return { title: title?.textContent!, url: "", img: "", desc: "" };
    })
    .filter((card) => {
      return card.url.startsWith(`/article`);
    })
    .map(async (card: InfoCard, i: number): Promise<InfoCard> => {
      // set timeout to avoid being blocked by the server for too many requests
      // timeout is set to 1s*index.
      let desc: string = await fecthBody(card.url).then(
        (body) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(summarise(body));
            }, SUMMARISER_DELAY * i);
          })
      );
      return { title: card.title, url: `https://www.apnews.com${card.url}`, img: card.img, desc: desc };
    });
  return Promise.all(promisedDescCards);
}

// politics news sources:

// CNN: left
// APP: (AP press) left leaning
// BBC: center
// WST: (Washington Times) right leaning
// FOX: right
export { parseCNN, parseFOX, parseAPP };
