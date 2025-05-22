export default {
  title: '抽取OH卡',
  subtitle: '讓我們看看今天的卡片會告訴您什麼',
  instructions:  {
    draw: '點擊下方按鈕抽取一張卡片',
    flip: '點擊卡片翻轉',
    answer: '思考問題並選擇您的答案',
  },
  buttons:  {
    draw: '抽取卡片',
    redraw: '重新抽取',
    flip: '翻轉卡片',
    continue: '繼續',
    back: '返回',
  },
  cardStates:  {
    drawing: '正在抽取卡片...',
    drawn: '卡片已抽取',
    flipping: '正在翻轉...',
    flipped: '卡片已翻轉',
  },
  questionTypes:  {
    singleChoice: '單选题',
    multiChoice: '多选题',
    openEnded: '開放式問題',
  },
  questionPrompt: '請思考以下問題：',
  answerPrompt: '請選擇您的答案：',
  textAnswerPlaceholder: '請在此輸入您的想法...',
  analysis:  {
    title: '分析結果',
    loading: '正在分析您的回答...',
    insight: '洞察',
    suggestion: '建議',
  },
  confirmRedraw:  {
    title: '確認重新抽取',
    message: '您確定要重新抽取一張卡片嗎？當前的進度將會丟失。',
    confirm: '確認',
    cancel: '取消',
  },
  shareCard:  {
    title: '分享卡片',
    description: '將這張卡片分享給朋友',
    copied: '鏈接已複製',
    download: '下載圖片',
  },
}