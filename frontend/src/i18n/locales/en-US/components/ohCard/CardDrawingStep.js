export default {
  title: 'Extracting OH cards',
  subtitle: 'Let\'s see what the card of today will tell you',
  instructions:  {
    draw: 'Click the button below to extract a card.',
    flip: 'Click to flip the card',
    answer: 'Thinking through the question and choosing your answer.',
  },
  buttons:  {
    draw: 'Card extraction',
    redraw: 'Re-extraction',
    flip: 'Flip Card',
    continue: 'Continue',
    back: 'Return',
  },
  cardStates:  {
    drawing: 'Card extraction is in progress...',
    drawn: 'Card has been extracted.',
    flipping: 'The flipping...',
    flipped: 'The card has been flipped.',
  },
  questionTypes:  {
    singleChoice: 'Single-Choice Question',
    multiChoice: 'Multiple-Choice Question',
    openEnded: 'Open-ended question',
  },
  questionPrompt: 'Please consider the following questions:',
  answerPrompt: 'Please choose your answer:',
  textAnswerPlaceholder: 'Please enter your thoughts here...',
  analysis:  {
    title: 'Analysis Results',
    loading: 'Analyzing your response...',
    insight: 'Insight',
    suggestion: 'Suggestion',
  },
  confirmRedraw:  {
    title: 'Confirmation for re-extraction',
    message: 'Are you sure you want to re-extract a card? The current progress will be lost.',
    confirm: 'Confirmation',
    cancel: 'Cancel',
  },
  shareCard:  {
    title: 'Sharing Card',
    description: 'Share this card with your friends.',
    copied: 'The link has been copied.',
    download: 'Download the image',
  },
}