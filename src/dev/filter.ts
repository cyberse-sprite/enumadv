export const eventFilter = (i: string) => {
    const f: { [index: string]: string } = {
        text: "文字",
        insert: "插入",
        next: "转跳",
        get: "引用",
        select: "选择",
        input: "输入",
        ope: "操作",
        if: "条件",
        rand: "随机"
    }
    return f[i] ? f[i] : i
}

export const eventColorFilter = (i: string) => {
    const c: { [index: string]: string } = {
        text: "#CCFF99",
        insert: "#E8CCFF",
        next: "#E8CCFF",
        get: "#CCFF99",
        select: "#99FFFF",
        input: "#CCEEFF",
        ope: "#FFFFBB",
        rand: "#FFC8B4"
    }
    return c[i] ? c[i] : '#ddd'
}