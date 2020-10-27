export const removeHeading = (text: string) => {
  return text.replace(/#{1,6} /, '');
};

const checker = {
  youtube: (text: string) => {
    const regex = /^<iframe.*src="https:\/\/www.youtube.com\/embed\/(.*?)".*<\/iframe>$/;
    const result = regex.exec(text);
    if (!result) return null;
    return result[1];
  },
  twitter: (text: string) => {
    if (!/^<blockquote class="twitter-tweet/.test(text)) return null;
    const regex = /href="(.*?)"/g;
    const links = [];
    let match = regex.exec(text);
    while (match) {
      links.push(match[1]);
      match = regex.exec(text);
    }
    const pathMatch = /twitter.com\/(.*?)\?/.exec(links[links.length - 1]);
    if (!pathMatch) return null;
    return pathMatch[1];
  },
  codesandbox: (text: string) => {
    const regex = /^<iframe.*src="https:\/\/codesandbox.io\/embed\/(.*?)".*<\/iframe>$/s;
    const result = regex.exec(text);
    if (!result) return null;
    return result[1];
  },
  codepen: (text: string) => {
    const regex = /^<iframe.*src="https:\/\/codepen.io\/(.*?)".*/;
    const result = regex.exec(text);
    if (!result) return null;
    return result[1];
  },
};

type CheckerKey = keyof typeof checker;

export const checkEmbed = (text: string) => {
  const keys = Object.keys(checker) as CheckerKey[];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const fn = checker[keys[i]];
    const code = fn(text);
    if (code) {
      return `!${key}[${code}]`;
    }
  }
  return null;
};
