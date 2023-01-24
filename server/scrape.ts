// use jsdom to parse HTML
export type InfoCard = {
  title?: string;
  url: string;
  img?: string;
};
const JSDOM = require("jsdom").JSDOM;

async function parseCNN(category: string): Promise<InfoCard[]> {
  const CNN = "https://www.cnn.com/" + category;
  // find div.container__headline in the response HTML
  const res = await fetch(CNN).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const links: NodeList = document.querySelectorAll("a.container__link");
  return Array.from(links)
    .map((link: Node): InfoCard => {
      const url = (link as HTMLElement).getAttribute("href")!;
      const title = (link as HTMLElement).querySelector("div.container__headline")?.textContent;
      const img = (link as HTMLElement).querySelector("img")?.getAttribute("src");
      if (title && url && img) {
        return { title, url, img };
      }
      return { title: "", url: "/video", img: "" };
    })
    .filter((card) => {
      return !card.url.startsWith("/video");
    })
    .map((card) => {
      return { title: card.title, url: `https://www.cnn.com${card.url}`, img: card.img };
    });
}

async function parseFOX(category: string): Promise<InfoCard[]> {
  const FOX = "https://www.foxnews.com/" + category;
  // find h2.title 's child a in the response HTML
  const res = await fetch(FOX).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const articles: NodeList = document.querySelectorAll("article.article");
  return Array.from(articles)
    .map((article: Node): InfoCard => {
      const title = (article as HTMLElement).querySelector("h2.title, h3.title, h4.title");
      const img = (article as HTMLElement).querySelector("div.m > a > img");
      const link = (title as HTMLElement).querySelector("a");
      if (link && img) {
        return { title: title?.textContent!, url: link.getAttribute("href")!, img: img.getAttribute("src")! };
      }
      return { title: title?.textContent!, url: "", img: "" };
    })
    .filter((card) => {
      return card.url.startsWith(`/${category}`);
    })
    .map((card) => {
      return { title: card.title, url: `https://www.foxnews.com${card.url}`, img: card.img };
    });
}

export { parseCNN, parseFOX };
