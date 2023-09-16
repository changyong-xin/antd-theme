import React from 'react';

interface IChildrenProfile {

    topHeight?: string | number;

    topWidth?: string | number;

    bottomHeight?: string | number;

    bottomWidth?: string | number;

    leftHeight?: string | number;

    leftWidth?: string | number;

    rightHeight?: string | number;

    rightWidth?: string | number;

    middleHeight?: string | number;

    middleWidth?: string | number;

}


export interface IOriLayout {

    /** 布局类型 垂直 | 水平 */
    orientation: 'vertical' | 'horizontal';

    className?: string;

    /** 填充（type='inner'时无效,默认16px） */
    padding?: number | string;

    /** 顶部 */
    topContent?: React.ReactNode;

    /** 顶部是否拉伸 */
    topStretch?: boolean;

    topClassName?: string;

    /** 底部 */
    bottomContent?: React.ReactNode;

    /** 底部是否拉伸 */
    bottomStretch?: boolean;

    bottomClassName?: string;

    /** 中间 */
    middleContent?: React.ReactNode;

    /** 中间是否拉伸 */
    middleStretch?: boolean;

    middleClassName?: string;

    /** 左侧 */
    leftContent?: React.ReactNode;

    /** 左侧是否拉伸 */
    leftStretch?: boolean;

    leftClassName?: string;

    /** 右侧 */
    rightContent?: React.ReactNode;

    /** 右侧是否拉伸 */
    rightStretch?: boolean;

    rightClassName?: string;

    /** 
     * 子结构的间距（默认为0px）
     * 
     * 即top、middle、bottom、left、right的间距
     */
    childrenGap?: number | string;

    /** 
     * 子结构宽高配置
     * 
     * 当子结构不设置自动拉伸时，需要在此处设定子结构的宽度与高度
     * 
     * 按照比例设定时，若总比例大于100%，实际高度取值是子结构宽高的百分比的比例
     * 
     * 比如：topHeight为100%，bottomHeight为300%，实际效果为25%、75%（不考虑子结构间距）
     * 
     */
    childrenProfile?: IChildrenProfile;

}

/** Orid组件容器 */
export class OriLayout extends React.Component<IOriLayout, any>{

    public render() {
        return (
            <div
                style={{
                    flexDirection: this.props.orientation === 'vertical' ? 'column' : 'row',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                }}
                className={this.props.className ? 'ori-layout ' + this.props.className : 'ori-layout'}>
                {this.props.orientation === 'vertical' ? this.getTopContent() : this.getLeftContent()}
            </div>
        )
    }

    public getTopContent() {
        if (!this.props.topContent) {
            return <></>
        }
        return <>
            <div
                style={
                    this.props.topStretch ?
                        this.getProfile()
                        : {
                            height: this.props.childrenProfile?.topHeight,
                            width: this.props.childrenProfile?.topWidth,
                        }
                }
                className={this.props.topClassName ? 'ori-layout-top ' + this.props.topClassName : 'ori-layout-top'}
            >
                {this.props.topContent}
            </div>
            {this.getDivider(this.props.orientation, 'top')}
            {this.props.middleContent ? this.getMiddleContent() : <></>}
            {this.props.bottomContent ? this.getBottomContent() : <></>}
        </>
    }

    public getLeftContent() {
        if (!this.props.leftContent) {
            return <></>
        }
        return <>
            <div
                style={
                    this.props.leftStretch ?
                        this.getProfile()
                        :
                        {
                            height: this.props.childrenProfile?.leftHeight,
                            width: this.props.childrenProfile?.leftWidth,
                        }
                }
                className={this.props.leftClassName ? 'ori-layout-left ' + this.props.leftClassName : 'ori-layout-left'} >
                {this.props.leftContent}
            </div>
            {this.getDivider(this.props.orientation, 'left')}
            {this.props.middleContent ? this.getMiddleContent() : <></>}
            {this.props.rightContent ? this.getRightContent() : <></>}
        </>
    }

    public getBottomContent() {
        return <div
            style={
                this.props.bottomStretch ?
                    this.getProfile()
                    :
                    {
                        height: this.props.childrenProfile?.bottomHeight,
                        width: this.props.childrenProfile?.bottomWidth,
                    }
            }
            className={this.props.bottomClassName ? 'ori-layout-bottom ' + this.props.bottomClassName : 'ori-layout-bottom'} >
            {this.props.bottomContent}
        </div>
    }

    public getRightContent() {
        return <div
            style={
                this.props.rightStretch ?
                    this.getProfile()
                    :
                    {
                        height: this.props.childrenProfile?.rightHeight,
                        width: this.props.childrenProfile?.rightWidth,
                    }
            }
            className={this.props.rightClassName ? 'ori-layout-right ' + this.props.rightClassName : 'ori-layout-right'} >
            {this.props.rightContent}
        </div>
    }

    public getMiddleContent() {
        return <>
            <div
                style={
                    this.props.middleStretch ?
                        this.getProfile()
                        :
                        {
                            height: this.props.childrenProfile?.middleHeight,
                            width: this.props.childrenProfile?.middleWidth,
                        }
                }
                className={this.props.middleClassName ? 'ori-layout-middle ' + this.props.middleClassName : 'ori-layout-middle'} >
                {this.props.middleContent}
            </div>
            {this.getDivider(this.props.orientation, 'middle')}
        </>
    }

    public getDivider(orientation: 'vertical' | 'horizontal', type: 'top' | 'left' | 'middle',) {
        if (orientation === 'vertical') {
            return <div
                className={'uicontainer-divider'}
                style={{ width: undefined, height: this.getChildrenGap(), minHeight: this.getChildrenGap(), maxHeight: this.getChildrenGap() }}
            />
        } else {
            return <div
                className={'uicontainer-divider'}
                style={{ height: undefined, width: this.getChildrenGap(), minWidth: this.getChildrenGap(), maxWidth: this.getChildrenGap() }}
            />
        }
    }

    public getProfile(): React.CSSProperties {
        return {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }
    }

    public getChildrenGap(): string | number {
        if (this.props.childrenGap !== undefined) {
            return this.props.childrenGap
        } else {
            return '0px'
        }
    }

}