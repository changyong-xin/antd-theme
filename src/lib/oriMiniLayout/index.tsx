import React from 'react';


export interface IOriLayout {

    /** 布局类型 垂直 | 水平 */
    orientation: 'vertical' | 'horizontal';

    /** 子元素1 */
    first: React.ReactNode;

    /** 子元素2 */
    second: React.ReactNode;

    /** 嵌套使用的时候只能在已经是自适应的容器中继续设置自适应宽高，否则不会生效 */
    stretch?: 'first' | 'second';

}

/** Orid组件容器-最小容器 */
export function OriMiniLayout(props: IOriLayout) {

    return (
        <div
            style={{
                flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
                height: '100%',
                width: '100%',
                display: 'flex',
            }}
            className={'ori-mini-layout'}
        >
            <div
                style={
                    props.stretch === 'second' ?
                        undefined
                        :
                        {
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }
                }
                className={'ori-mini-layout-top'}
            >
                {props.first}
            </div>
            <div
                style={
                    props.stretch === 'first' ?
                        undefined
                        :
                        {
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }
                }
                className={'ori-mini-layout-bottom'}
            >
                {props.second}
            </div>
        </div>
    )

}