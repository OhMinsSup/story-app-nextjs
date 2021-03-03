import React, { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import remark from 'remark';
import htmlPlugin from 'remark-html';
import breaks from 'remark-breaks';
import parse from 'html-react-parser';

// @ts-ignore
import slug from 'remark-slug';

import media from '~/libs/styles/media';
import Typography from './Typography';
import embedPlugin from '~/libs/remark/embedPlugin';
import prismPlugin from '~/libs/remark/prismPlugin.js';
import { loadScript, filter } from '~/libs/utils';
import prismThemes from '~/libs/styles/prismThemes';

const MarkdownRenderBlock = styled.div`
  &.atom-one-dark {
    ${prismThemes['atom-one-dark']}
  }
  &.atom-one-light {
    ${prismThemes['atom-one-light']}
  }
  &.github {
    ${prismThemes['github']}
  }
  &.monokai {
    ${prismThemes['monokai']}
  }
  &.dracula {
    ${prismThemes['dracula']}
  }

  pre {
    font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    letter-spacing: 0px;
    ${media.small} {
      font-size: 0.75rem;
      padding: 0.75rem;
    }
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  iframe {
    width: 768px;
    height: 430px;
    max-width: 100%;
    background: black;
    display: block;
    margin: auto;
    border: none;
    border-radius: 4px;
    overflow: hidden;
  }
  .twitter-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: none;
    background: none;
    padding: none;
  }
`;

type RenderedElement =
  | string
  | React.DetailedReactHTMLElement<any, HTMLElement>
  | Array<React.DetailedReactHTMLElement<any, HTMLElement>>
  | null;

interface MarkdownRenderProps {
  markdown: string;
}
function MarkdownRender({ markdown }: MarkdownRenderProps) {
  const [html, setHtml] = useState(
    typeof window !== 'undefined'
      ? filter(
          remark()
            .use(breaks)
            .use(prismPlugin)
            .use(htmlPlugin, {
              sanitize: true,
            })
            .use(embedPlugin)
            .use(slug)
            .processSync(markdown)
            .toString()
        )
      : ''
  );

  const [element, setElement] = useState<RenderedElement>(null);

  const applyElement = React.useMemo(() => {
    return throttle((el: any) => {
      setElement(el);
    }, 250);
  }, []);

  useEffect(() => {
    remark()
      .use(breaks)
      .use(prismPlugin)
      .use(htmlPlugin)
      .use(embedPlugin)
      .use(slug)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);

        // load twitter script if needed
        if (html.indexOf('class="twitter-tweet"') !== -1) {
          // if (window && (window as any).twttr) return;
          loadScript('https://platform.twitter.com/widgets.js');
        }

        setHtml(filter(html));

        const el = parse(filter(html));

        applyElement(el);
      });
  }, [applyElement, markdown]);
  return (
    <Typography>
      <MarkdownRenderBlock
        className="dracula"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Typography>
  );
}

export default MarkdownRender;
