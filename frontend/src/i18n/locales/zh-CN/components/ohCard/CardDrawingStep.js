export default {
  title: '抽取OH卡',
  subtitle: '让我们看看今天的卡片会告诉您什么',
  instructions: {
    draw: '点击下方按钮抽取一张卡片',
    flip: '点击卡片翻转',
    answer: '思考问题并选择您的答案'
  },
  buttons: {
    draw: '抽取卡片',
    redraw: '重新抽取',
    flip: '翻转卡片',
    continue: '继续',
    back: '返回'
  },
  cardStates: {
    drawing: '正在抽取卡片...',
    drawn: '卡片已抽取',
    flipping: '正在翻转...',
    flipped: '卡片已翻转'
  },
  questionTypes: {
    singleChoice: '单选题',
    multiChoice: '多选题',
    openEnded: '开放式问题'
  },
  questionPrompt: '请思考以下问题：',
  answerPrompt: '请选择您的答案：',
  textAnswerPlaceholder: '请在此输入您的想法...',
  analysis: {
    title: '分析结果',
    loading: '正在分析您的回答...',
    insight: '洞察',
    suggestion: '建议'
  },
  confirmRedraw: {
    title: '确认重新抽取',
    message: '您确定要重新抽取一张卡片吗？当前的进度将会丢失。',
    confirm: '确认',
    cancel: '取消'
  },
  shareCard: {
    title: '分享卡片',
    description: '将这张卡片分享给朋友',
    copied: '链接已复制',
    download: '下载图片'
  }
} 