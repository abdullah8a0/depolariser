// use jsdom to parse HTML

const JSDOM = require("jsdom").JSDOM;

async function parseCNN(category: string): Promise<string[]> {
  const CNN = "https://www.cnn.com/" + category;
  // find div.container__headline in the response HTML
  const res = await fetch(CNN).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const links: NodeList = document.querySelectorAll("a.container__link");
  return Array.from(links)
    .map((link: Node) => {
      return (link as HTMLElement).getAttribute("href")!;
    })
    .filter((link: string) => {
      return !link.startsWith("/video");
    })
    .map((link: string) => {
      return `https://www.cnn.com${link}`;
    });
}

async function parseFOX(category: string): Promise<string[]> {
  const FOX = "https://www.foxnews.com/" + category;
  // find h2.title 's child a in the response HTML
  const res = await fetch(FOX).then((res) => res.text());
  const { window } = new JSDOM();
  const { document } = window;
  document.body.innerHTML = res;
  const articles: NodeList = document.querySelectorAll("article.article");
  return Array.from(articles)
    .map((article: Node) => {
      const titleLink = (article as HTMLElement).querySelector("h2.title > a, h3.title > a, h4.title > a");
      if (titleLink) {
        return titleLink.getAttribute("href")!;
      }
      return "";
    })
    .filter((link) => {
      return link.startsWith(`/${category}`);
    })
    .map((link) => {
      return `https://www.foxnews.com${link}`;
    });
}

export { parseCNN, parseFOX };
