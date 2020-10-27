// eslint-disable-next-line import/no-extraneous-dependencies
import visit from 'unist-util-visit';

const embedTypeRegex = /^!(youtube|twitter|codesandbox|codepen)$/;
const converters = {
  youtube: (code) =>
    `<iframe class="embed" src="https://www.youtube.com/embed/${code}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  twitter: (code) =>
    `<blockquote class="twitter-wrapper"><blockquote class="twitter-tweet" data-lang="ko"><a href="https://twitter.com/${code}"></a></blockquote></blockquote>`,
  codesandbox: (code) =>
    `<iframe class="embed" src="https://codesandbox.io/embed/${code}" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`,
  codepen: (code) =>
    `<iframe class="embed" scrolling="no" title="Tab Menu Layout2" src="https://codepen.io/${code}" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`,
};

export default function embedPlugin() {
  function transformer(tree) {
    function visitor(node) {
      try {
        const { children } = node;
        if (children.length < 2) return;
        const index = children.findIndex((childNode) => {
          if (!childNode.value) return false;
          return childNode.value.match(embedTypeRegex);
        });
        if (index === -1) return;
        const childNode = children[index];
        const siblingNode = children[index + 1];
        if (!siblingNode || siblingNode.type !== 'linkReference') return;
        const { label } = siblingNode;
        const match = embedTypeRegex.exec(children[index].value);
        if (!match) return;
        const type = match[1];

        childNode.type = 'html';
        childNode.value = converters[type](label);
        children.splice(index + 1, 1);
      } catch (e) {
        console.error(e);
      }
    }

    visit(tree, 'paragraph', visitor);
  }

  return transformer;
}
