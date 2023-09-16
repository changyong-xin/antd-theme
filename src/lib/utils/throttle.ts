
// 节流与防抖的区别在于是立即执行还是延迟执行，
// 立即执行（在settimeout外执行）并阻断后续执行为节流，
// 延迟执行（在settimeout内执行）并阻断先前执行为防抖，

/** 节流-自定义时间 */
function throttling() {

    let isFinished: boolean = true;

    /** 节流-控制函数执行间隔-自定义时间(默认500ms) */
    return (fun: () => void, time?: number) => {

        if (isFinished === false) {
            return
        }
        isFinished = false;
        fun()
        setTimeout(() => {
            isFinished = true;
        }, time || 500);
    }
}


/** 防抖-自定义时间 */
function antishaking() {

    let timer: NodeJS.Timeout | undefined;

    /** 防抖-控制函数执行等待-自定义时间(默认500ms) */
    return (fun: () => void, time?: number) => {

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fun()
        }, time || 500);
    }
}

/** 节流-控制函数执行间隔-自定义时间(默认500ms) */
export const throttle = throttling()

/** 防抖-控制函数执行等待-自定义时间(默认500ms) */
export const antiShaking = antishaking()