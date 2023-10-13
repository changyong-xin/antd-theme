import { Button, Card } from "antd";
import { useEffect, useState } from "react";

function SimpleDemo() {
    const [count, setCount] = useState(0)
    return (
        <Button onClick={() => setCount(count + 1)}>{'Count: ' + count}</Button>
    )
}

function StateDemo() {
    const [count, setCount] = useState(0)
    let effectCount = 0;
    let effectObject = { count: 0 }
    console.log('render:' + count + effectCount + effectObject.count)
    console.log(StateDemo.prototype)
    return (
        <div>
            <div>
                <p>effectCount和effectObject.count的值不会发生变化，因为每次执行这个方法都重新赋值了</p>
                <p>同理，如果定义一个函数let fun=console.log(' ')也会被重新赋值</p>
                <p>如果使用了定时器而不清理，每次渲染都会重新生成，导致内存泄漏</p>
            </div>
            <Button onClick={() => {
                effectCount += 1;
                effectObject.count += 1;
                setCount(count + 1)
            }}>
                {'Count: ' + count + ' effectCount: ' + effectCount + ' effectObject.coun: ' + effectObject.count}
            </Button>
            <ChildrenDemo count={count} />
        </div>
    )
}

function ChildrenDemo(props: { count: number }) {
    console.log('ChildrenDemo excute', props.count)
    return (<div>{'Children component:' + props.count}</div>)
}

function EffectDemo1() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('after render')
    })
    console.log('render')
    return (
        <div>
            <p>useEffect没有依赖项的时候：每次渲染都会执行副作用方法，相当于didUpdate的生命周期</p>
            <Button onClick={() => setCount(count + 1)}>{'Count: ' + count}</Button>
        </div>
    )
}

function EffectDemo2() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('didMount')
    }, [])
    console.log('render')
    return (
        <div>
            <p>useEffect依赖项是空数组的时候：只有第一次渲染会执行副作用方法，相当于didMount的生命周期</p>
            <Button onClick={() => setCount(count + 1)}>{'Count: ' + count}</Button>
        </div>
    )
}

function EffectDemo3() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('didMount')
        return () => {
            console.log('unMount')
        }
    }, [])
    console.log('render')
    return (
        <div>
            <p>useEffect副作用函数返回值是function的时候，相当于willUnmount的生命周期,在这个演示中，可以通过关闭标签页触发unMount</p>
            <Button onClick={() => setCount(count + 1)}>{'Count: ' + count}</Button>
        </div>
    )
}

function EffectDemo4() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('didMount')
        return () => {
            console.log('unMount')
        }
    })
    console.log('render')
    return (
        <div>
            <p>
                useEffect副作用函数返回值是function的时候，并且依赖项不是空数组，则会在渲染时先执行上次副作用函数的返回函数再执行副作用函数。
                实际组件没有卸载，只是为了处理遗留的副作用函数
            </p>
            <Button onClick={() => setCount(count + 1)}>{'Count: ' + count}</Button>
        </div>
    )
}


function EffectDemo5() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0)
    useEffect(() => {
        console.log('count change')
    }, [count])
    console.log('render')
    return (
        <div>
            <p>useEffect依赖项是数组的时候：数组内部值改变时会执行副作用函数，在这个示例中，点击count2不会触发，点击count会触发</p>
            <Button onClick={() => setCount(count + 1)}>{'Count1: ' + count}</Button>
            <Button onClick={() => setCount2(count2 + 1)}>{'Count2: ' + count2}</Button>
        </div>
    )
}

export function HooksDemo(props: any) {

    return (
        <>
            <a href='https://zhuanlan.zhihu.com/p/567534059?utm_id=0'>Hooks原理分析：https://zhuanlan.zhihu.com/p/567534059?utm_id=0</a>
            <Card title='简单使用-useState' style={{ margin: '8px 0px' }} >
                <SimpleDemo />
            </Card>

            <Card title='状态管理-不要使用自定义变量' style={{ margin: '8px 0px' }} >
                <StateDemo />
            </Card>

            <Card title='副作用处理-useEffect' style={{ margin: '8px 0px' }} >
                <p>
                    简单地说,React副作用是在组件渲染期间发生的任何操作,这些操作不仅仅是更新DOM。
                    副作用可能包括网络请求、访问本地存储、添加或删除事件监听器等。
                    useEffect整合了生命周期中的didMount、didUpdate、willUnmount方法
                </p>
                <EffectDemo1 />
                <EffectDemo2 />
                <EffectDemo3 />
                <EffectDemo4 />
                <EffectDemo5 />
            </Card>
        </>
    )

}