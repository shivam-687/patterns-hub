import React, { PropsWithChildren } from 'react'
import SyntaxHighlighter  from 'react-syntax-highlighter'
import nighOwl from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl'

export type CodeProps = {
    language?: string,
    style?: any,
    highlite?: number[]
}

const Code = (props: PropsWithChildren<CodeProps>) => {
  return (
    <SyntaxHighlighter language={props.language || 'javascript'} style={nighOwl} customStyle={{background: 'inherit'}} wrapLines={true} showLineNumbers lineProps={lineNumber => {
                let style: any = { display: 'block' };
                if (props.highlite && props.highlite.includes(lineNumber)) {
                  style.backgroundColor = '#372948';
                }
                return { style };
          }}>
        {props.children ? props.children.toString().trim() as string : ''}
    </SyntaxHighlighter>
  )
}

export default Code