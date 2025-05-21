import { ref, reactive, computed, onMounted } from 'vue'

/**
 * OH卡游戏逻辑和状态管理
 * @returns {Object} OH卡游戏状态和方法
 */
export default function useOHCard() {
  // 静态数据
  const steps = [
    {
      title: '确定心中的卡点',
      description: '思考你最近遇到的困惑或问题'
    },
    {
      title: '凝聚宇宙能量',
      description: '抽取你的OH卡'
    },
    {
      title: '问题引导',
      description: '让自己代入图片中'
    },
    {
      title: '寻找启发',
      description: '从图片与问题中找到解决卡点的启发'
    },
    {
      title: '完成体验',
      description: '拿走你的纪念卡'
    }
  ]

  // 问题池
  const questionPools = [
    [
      "看到了什么？感受如何？",
      "抽到的卡牌与你最近发生的事或感受相关吗？",
      "你说卡牌中的两个主角，他们是什么关系？"
    ],
    [
      "我很好奇，你为什么会这样描述它？",
      "你注意到的这个细节，你觉得它是什么？从哪里来的？",
      "你觉得这个人在做什么？ta做这件事有什么感受？"
    ],
    [
      "卡中人物处在什么环境中？环境对ta有什么影响？",
      "你在这个卡牌中吗？你是里面的谁？在做什么？感受如何？",
      "你的故事里，主角遭遇的事情，ta可以怎么解决？"
    ]
  ]

  // 响应式状态
  const currentStep = ref(1)
  const currentRound = ref(0)
  const selectedQuestions = ref([])
  const selectedQuestionIndices = ref([])
  const currentCardNumber = ref(null)
  const hasAnsweredQuestion = ref(false)
  const hasDrawnCard = ref(false)
  const isCardFlipped = ref(false)
  const hasCompletedQuestions = ref(false)
  const showConfirmationModal = ref(false)
  const showImagePreviewModal = ref(false)
  const ohCardMiniContainer = ref(null)

  // 图片源
  const cardImageSrc = ref('/src/assets/images/material/oh/cards/back.png')
  // 尝试使用相对路径或绝对URL路径
  //const cardImageSrc = ref('./assets/images/material/oh/cards/back.png') 
  const cardBackImageSrc = ref('')

  // 添加图片错误处理状态
  const cardImageError = ref(false)
  const cardBackImageError = ref(false) 
  const cardBackPreviewError = ref(false)
  const cardImgElement = ref(null)
  const cardBackImgElement = ref(null)

  // 计算属性
  const currentQuestions = computed(() => questionPools[currentRound.value])

  // 调试相关状态
  const showDebug = ref(false)

  // 图片加载重试相关
  const maxRetries = 3
  let retryCount = 0

  // 方法
  const scrollToOhCardMini = () => {
    ohCardMiniContainer.value?.scrollIntoView({ behavior: 'smooth' })
  }

  const goToStep = (step) => {
    console.log(`[OH卡] 步骤切换: ${currentStep.value} -> ${step}`)
    currentStep.value = step
    
    // 验证步骤切换后DOM状态
    setTimeout(() => {
      const activeStep = document.querySelector('.oh-card-step.active')
      console.log(`[OH卡] 当前可见步骤元素:`, activeStep ? true : false)
      
      // 如果步骤是2，验证能量动画元素
      if (step === 2) {
        const energyCircle = document.querySelector('.energy-circle')
        console.log(`[OH卡] 能量圈元素存在:`, energyCircle ? true : false)
      }
      
      // 如果步骤是3，验证卡片容器元素
      if (step === 3) {
        const cardContainer = document.querySelector('.card-container')
        console.log(`[OH卡] 卡片容器元素存在:`, cardContainer ? true : false)
      }
    }, 100)
  }

  const drawCard = () => {
    console.log('[OH卡] 开始抽卡流程')
    
    // 先显示加载状态
    goToStep(3)
    console.log('[OH卡] 已切换到步骤3')
    
    // 重置状态
    selectedQuestions.value = []
    selectedQuestionIndices.value = []
    hasAnsweredQuestion.value = false
    isCardFlipped.value = false
    hasCompletedQuestions.value = false
    hasDrawnCard.value = false
    retryCount = 0
    console.log('[OH卡] 状态已重置')
    
    // 生成11-19之间的随机数
    currentCardNumber.value = Math.floor(Math.random() * 9) + 11
    console.log(`[OH卡] 抽取卡片编号: ${currentCardNumber.value}`)
    
    try {
      // 预加载实际卡片图片
      const preloadImage = new Image()
      preloadImage.onload = function() {
        console.log(`[OH卡] 卡片 ${currentCardNumber.value} 预加载成功`)
        retryCount = 0 // 重置重试计数
      }
      preloadImage.onerror = function(err) {
        console.error(`[OH卡] 卡片 ${currentCardNumber.value} 加载失败:`, err)
        
        if (retryCount < maxRetries) {
          retryCount++
          console.log(`[OH卡] 尝试第${retryCount}次重试加载...`)
          
          // 使用备用卡片编号进行重试
          const fallbackCardNum = 11 // 使用11号卡片作为备用
          currentCardNumber.value = fallbackCardNum // 更新当前卡片编号
          
          // 使用新路径加载
          preloadImage.src = `/src/assets/images/material/oh/cards/${fallbackCardNum}.png`
        } else {
          console.log('[OH卡] 达到最大重试次数，使用SVG备用图像')
          // 使用内联SVG作为终极备用图像
          cardImageSrc.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMzMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjExMCIgeT0iMTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5PSOWNoeWbvueJh+acqui/m+W8guWPkTwvdGV4dD48L3N2Zz4='
        }
      }
      
      // 构造并显示图片路径
      const cardPath = `/src/assets/images/material/oh/cards/${currentCardNumber.value}.png`
      console.log('[OH卡] 尝试加载卡片图片:', cardPath)
      preloadImage.src = cardPath
      
      // 卡片抽取动画序列
      console.log('[OH卡] 开始卡片抽取动画序列')
      setTimeout(() => {
        // 1. 先显示卡背
        console.log('[OH卡] 显示卡背')
        cardImageSrc.value = '/src/assets/images/material/oh/cards/back.png'
        
        // 2. 添加抽取动画效果
        hasDrawnCard.value = true
        console.log('[OH卡] 添加抽取动画效果:', hasDrawnCard.value)
        
        // 验证DOM状态
        setTimeout(() => {
          const cardInner = document.querySelector('.card-inner')
          console.log('[OH卡] 卡片内部元素状态:', {
            hasClass: cardInner?.classList.contains('card-drawn'),
            isVisible: cardInner?.offsetParent !== null
          })
        }, 100)
        
        // 3. 延迟后翻转为实际卡片
        setTimeout(() => {
          console.log('[OH卡] 显示实际卡片图像')
          try {
            cardImageSrc.value = `/src/assets/images/material/oh/cards/${currentCardNumber.value}.png`
            console.log('[OH卡] 卡片图像已设置')
            
            // 4. 显示第一轮问题
            currentRound.value = 0
            console.log('[OH卡] 设置当前问题轮次为:', currentRound.value)
            console.log('[OH卡] 当前问题:', questionPools[currentRound.value])
            
            // 验证问题选项是否显示
            setTimeout(() => {
              const questionOptions = document.querySelectorAll('.question-option')
              console.log('[OH卡] 问题选项数量:', questionOptions.length)
            }, 100)
          } catch (err) {
            console.error('[OH卡] 设置卡片图像失败:', err)
          }
        }, 800)
      }, 500)
    } catch (error) {
      console.error('[OH卡] 抽卡过程发生错误:', error)
    }
  }

  const selectQuestionOption = (question, index) => {
    console.log(`[OH卡] 选择问题选项: "${question}" (索引: ${index})`)
    
    // 第一次回答问题时，标记为已开始回答
    if (selectedQuestions.value.length === 0) {
      console.log('[OH卡] 首次回答问题，标记为已开始回答')
      hasAnsweredQuestion.value = true
    }
    
    // 添加选中的问题到数组
    selectedQuestions.value.push(question)
    
    // 只保存当前轮次的选中索引，而不是所有轮次的
    selectedQuestionIndices.value = [index]
    console.log('[OH卡] 当前轮次选中索引:', selectedQuestionIndices.value)
    console.log('[OH卡] 当前已选问题:', selectedQuestions.value)
    
    // 延迟后移动到下一轮或完成
    setTimeout(() => {
      if (currentRound.value < 2) {
        // 进入下一轮问题前清空选中索引
        console.log(`[OH卡] 进入下一轮问题: ${currentRound.value} -> ${currentRound.value + 1}`)
        currentRound.value++
        // 进入新轮次时清空选中索引
        selectedQuestionIndices.value = []
        console.log('[OH卡] 已清空选中索引，当前轮次问题:', questionPools[currentRound.value])
      } else {
        // 完成所有问题
        console.log('[OH卡] 已回答完所有轮次的问题，进入完成阶段')
        finishCardReading()
      }
    }, 500)
  }

  const finishCardReading = () => {
    console.log('[OH卡] 进入卡片阅读完成流程')
    hasCompletedQuestions.value = true
    console.log('[OH卡] 已标记为完成问题')
    
    // 生成卡背图片
    console.log('[OH卡] 开始生成卡背图片')
    try {
      createCardBackWithQuestions()
      console.log('[OH卡] 卡背图片生成成功:', cardBackImageSrc.value ? '有内容' : '无内容')
      
      // 验证卡背图片
      if (!cardBackImageSrc.value) {
        console.error('[OH卡] 卡背图片生成失败，URL为空')
      }
    } catch (error) {
      console.error('[OH卡] 生成卡背图片时发生错误:', error)
    }
    
    // 延迟后翻转卡片
    console.log('[OH卡] 准备翻转卡片')
    setTimeout(() => {
      console.log('[OH卡] 执行卡片翻转')
      isCardFlipped.value = true
    }, 800)
  }

  const createCardBackWithQuestions = () => {
    // 在实际应用中，这里应该使用Canvas绘制问题到卡背
    // 创建Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置Canvas尺寸 - 使用标准卡片尺寸比例 - 与saveCard函数保持一致
    canvas.width = 500; // 与saveCard中的cardWidth一致
    canvas.height = 750; // 与saveCard中的cardHeight一致

    // 绘制背景 - 首先绘制星盘牌背图像
    const backImg = new Image();
    backImg.onload = () => {
      // 绘制星盘背景
      ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height);
      
      // 添加半透明黑色遮罩，使文字更加清晰可见
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 设置文字样式
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // 添加文字阴影效果
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // 添加标题
      ctx.font = 'bold 28px Arial';
      ctx.fillText('我的OH卡问题', canvas.width / 2, 80);

      // 计算每个问题所需的垂直空间
      const availableHeight = canvas.height - 150; // 去除顶部和底部的空间
      const questionSpacing = availableHeight / (selectedQuestions.value.length + 1); // 均匀分布问题
      
      // 绘制问题文字
      selectedQuestions.value.forEach((question, index) => {
        // 根据问题长度动态调整字体大小，但限制最大和最小字体
        const fontSize = Math.min(Math.max(question.length > 25 ? 16 : 18, 14), 18);
        ctx.font = `${fontSize}px Arial`;

        // 分割长文本为多行
        const maxWidth = canvas.width - 60; // 留出左右边距
        const words = question.split('');
        let line = '';
        let lines = [];

        // 中文文本分行处理
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i];
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && line !== '') {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }

        if (line !== '') {
          lines.push(line);
        }

        // 计算文本块的起始Y坐标
        const lineHeight = fontSize * 1.2; // 减小行高，防止重叠
        // 均匀分布每个问题
        const startY = 120 + (index + 1) * questionSpacing; 

        // 绘制问题序号
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`问题 ${index + 1}:`, canvas.width / 2, startY);
        
        // 恢复问题字体
        ctx.font = `${fontSize}px Arial`;

        // 计算所有行的总高度
        const totalTextHeight = lines.length * lineHeight;
        // 绘制文本行，并确保文本块不超出问题空间
        lines.forEach((l, i) => {
          const lineY = startY + 30 + i * lineHeight; // 问题序号与内容的间距
          ctx.fillText(l, canvas.width / 2, lineY);
        });
      });

      // 清除阴影效果
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 添加水印
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('ALiveMe OH卡', canvas.width / 2, canvas.height - 20);

      // 将Canvas转换为图片URL
      cardBackImageSrc.value = canvas.toDataURL('image/png');
    };

    // 加载星盘牌背图像
    backImg.src = '/src/assets/images/material/oh/cards/back.png';
    
    // 处理图像加载失败的情况
    backImg.onerror = () => {
      console.error('[OH卡] 卡背基础图像加载失败，使用纯色背景');
      
      // 使用纯色背景替代
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 添加渐变背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');  // 绿色
      gradient.addColorStop(1, 'rgba(33, 150, 243, 0.3)');  // 蓝色
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 继续绘制文字...与上面相同的文字绘制逻辑
      // 添加半透明黑色遮罩，使文字更加清晰可见
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 设置文字样式
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // 添加文字阴影效果
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // 添加标题
      ctx.font = 'bold 28px Arial';
      ctx.fillText('我的OH卡问题', canvas.width / 2, 80);

      // 计算每个问题所需的垂直空间
      const availableHeight = canvas.height - 150; // 去除顶部和底部的空间
      const questionSpacing = availableHeight / (selectedQuestions.value.length + 1); // 均匀分布问题
      
      // 绘制问题文字
      selectedQuestions.value.forEach((question, index) => {
        // 根据问题长度动态调整字体大小，但限制最大和最小字体
        const fontSize = Math.min(Math.max(question.length > 25 ? 16 : 18, 14), 18);
        ctx.font = `${fontSize}px Arial`;

        // 分割长文本为多行
        const maxWidth = canvas.width - 60; // 留出左右边距
        const words = question.split('');
        let line = '';
        let lines = [];

        // 中文文本分行处理
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i];
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && line !== '') {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }

        if (line !== '') {
          lines.push(line);
        }

        // 计算文本块的起始Y坐标
        const lineHeight = fontSize * 1.2; // 减小行高，防止重叠
        // 均匀分布每个问题
        const startY = 120 + (index + 1) * questionSpacing;

        // 绘制问题序号
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`问题 ${index + 1}:`, canvas.width / 2, startY);
        
        // 恢复问题字体
        ctx.font = `${fontSize}px Arial`;

        // 绘制每一行
        lines.forEach((l, i) => {
          const lineY = startY + 30 + i * lineHeight; // 问题序号与内容的间距
          ctx.fillText(l, canvas.width / 2, lineY);
        });
      });

      // 清除阴影效果
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 添加水印
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('ALiveMe OH卡', canvas.width / 2, canvas.height - 20);

      // 将Canvas转换为图片URL
      cardBackImageSrc.value = canvas.toDataURL('image/png');
    };
  }

  const showRedrawConfirmation = () => {
    showConfirmationModal.value = true
  }

  const hideRedrawConfirmation = () => {
    showConfirmationModal.value = false
  }

  const redrawCard = () => {
    hideRedrawConfirmation()
    
    // 重置状态
    selectedQuestions.value = []
    selectedQuestionIndices.value = []
    hasAnsweredQuestion.value = false
    isCardFlipped.value = false
    hasCompletedQuestions.value = false
    
    // 重新抽卡
    drawCard()
  }

  const showImagePreview = () => {
    // 移除条件，确保任何时候点击卡片都能预览
    console.log('[OH卡] 触发图片预览模态框')
    console.log('[OH卡] 当前showImagePreviewModal值:', showImagePreviewModal.value)
    console.log('[OH卡] 卡片图片信息:', {
      cardImageSrc: cardImageSrc.value ? '有图片' : '无图片',
      cardBackImageSrc: cardBackImageSrc.value ? '有图片' : '无图片',
      hasCompletedQuestions: hasCompletedQuestions.value,
      actualImageSrc: cardImageSrc.value
    })
    
    // 设置模态框状态为可见
    showImagePreviewModal.value = true
    console.log('[OH卡] 设置showImagePreviewModal为true后:', showImagePreviewModal.value)
    
    // 确保显示预览
    setTimeout(() => {
      // 检查模态框是否显示
      const previewElement = document.querySelector('.image-preview-modal')
      console.log('[OH卡] 预览模态框元素存在:', previewElement ? '是' : '否')
      
      // 如果模态框不存在，直接使用原生DOM创建
      if (!previewElement) {
        console.log('[OH卡] 模态框不存在，使用原生DOM创建')
        createDirectPreview()
      }
    }, 100)
  }

  // 使用原生DOM直接创建预览
  const createDirectPreview = () => {
    // 移除可能存在的之前的预览
    const existingPreview = document.getElementById('direct-preview-modal')
    if (existingPreview) {
      document.body.removeChild(existingPreview)
    }
    
    // 创建模态框容器
    const modalDiv = document.createElement('div')
    modalDiv.id = 'direct-preview-modal'
    modalDiv.style.position = 'fixed'
    modalDiv.style.top = '0'
    modalDiv.style.left = '0'
    modalDiv.style.right = '0'
    modalDiv.style.bottom = '0'
    modalDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    modalDiv.style.display = 'flex'
    modalDiv.style.alignItems = 'center'
    modalDiv.style.justifyContent = 'center'
    modalDiv.style.zIndex = '9999'
    modalDiv.style.padding = '20px'
    
    // 阻止页面滚动
    document.body.style.overflow = 'hidden'
    
    // 卡片容器
    const cardsContainer = document.createElement('div')
    cardsContainer.style.display = 'flex'
    cardsContainer.style.flexDirection = window.innerWidth < 768 ? 'column' : 'row'
    cardsContainer.style.gap = '20px'
    cardsContainer.style.position = 'relative'
    
    // 关闭按钮
    const closeBtn = document.createElement('button')
    closeBtn.textContent = '×'
    closeBtn.style.position = 'absolute'
    closeBtn.style.top = '-40px'
    closeBtn.style.right = '-40px'
    closeBtn.style.width = '40px'
    closeBtn.style.height = '40px'
    closeBtn.style.borderRadius = '50%'
    closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    closeBtn.style.color = 'white'
    closeBtn.style.fontSize = '24px'
    closeBtn.style.border = 'none'
    closeBtn.style.cursor = 'pointer'
    closeBtn.style.display = 'flex'
    closeBtn.style.alignItems = 'center'
    closeBtn.style.justifyContent = 'center'
    closeBtn.style.padding = '0'
    
    // 关闭按钮悬停效果
    closeBtn.onmouseover = () => {
      closeBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
      closeBtn.style.transform = 'scale(1.1)'
    }
    closeBtn.onmouseout = () => {
      closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      closeBtn.style.transform = 'scale(1)'
    }
    
    // 关闭按钮点击事件
    closeBtn.onclick = () => {
      closeModal()
    }
    
    cardsContainer.appendChild(closeBtn)
    
    // 卡片正面
    const frontCard = document.createElement('div')
    frontCard.style.width = '350px'
    frontCard.style.height = '525px'
    frontCard.style.borderRadius = '20px'
    frontCard.style.overflow = 'hidden'
    frontCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)'
    frontCard.style.position = 'relative'
    frontCard.style.cursor = 'pointer'
    frontCard.style.backgroundColor = '#f5f5f5'
    frontCard.style.transition = 'all 0.3s ease'
    
    const frontImg = document.createElement('img')
    frontImg.src = cardImageSrc.value
    frontImg.alt = 'OH卡正面'
    frontImg.style.width = '100%'
    frontImg.style.height = '100%'
    frontImg.style.objectFit = 'cover'
    frontImg.style.transition = 'transform 0.3s ease'
    
    // 卡片悬停效果
    frontCard.onmouseover = () => {
      frontImg.style.transform = 'scale(1.03)'
      frontCard.style.boxShadow = '0 15px 35px rgba(243, 156, 18, 0.5)'
    }
    frontCard.onmouseout = () => {
      if (frontCard.dataset.fullscreen !== 'true') {
        frontImg.style.transform = 'scale(1)'
        frontCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)'
      }
    }
    
    // 卡片点击放大/缩小
    frontCard.onclick = () => {
      // 如果已经是全屏，则缩小
      if (frontCard.dataset.fullscreen === 'true') {
        frontCard.style.width = '350px'
        frontCard.style.height = '525px'
        frontCard.style.zIndex = '1'
        frontCard.dataset.fullscreen = 'false'
        hint.textContent = '点击卡片可放大查看'
      } else {
        // 否则放大
        frontCard.style.width = '80vh'
        frontCard.style.height = '120vh'
        frontCard.style.maxWidth = '95vw'
        frontCard.style.maxHeight = '85vh'
        frontCard.style.zIndex = '10'
        frontCard.dataset.fullscreen = 'true'
        hint.textContent = '点击卡片可缩小查看'
        
        // 如果有背面卡片并且是全屏，则缩小背面卡片
        if (backCard && backCard.dataset.fullscreen === 'true') {
          backCard.style.width = '350px'
          backCard.style.height = '525px'
          backCard.style.zIndex = '1'
          backCard.dataset.fullscreen = 'false'
        }
      }
    }
    
    frontCard.appendChild(frontImg)
    cardsContainer.appendChild(frontCard)
    
    // 背面卡片变量
    let backCard = null
    
    // 如果有完成问题和背面图片
    if (hasCompletedQuestions.value && cardBackImageSrc.value) {
      backCard = document.createElement('div')
      backCard.style.width = '350px'
      backCard.style.height = '525px'
      backCard.style.borderRadius = '20px'
      backCard.style.overflow = 'hidden'
      backCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)'
      backCard.style.position = 'relative'
      backCard.style.cursor = 'pointer'
      backCard.style.backgroundColor = '#f5f5f5'
      backCard.style.transition = 'all 0.3s ease'
      
      const backImg = document.createElement('img')
      backImg.src = cardBackImageSrc.value
      backImg.alt = 'OH卡背面'
      backImg.style.width = '100%'
      backImg.style.height = '100%'
      backImg.style.objectFit = 'cover'
      backImg.style.transition = 'transform 0.3s ease'
      
      // 背面卡片悬停效果
      backCard.onmouseover = () => {
        backImg.style.transform = 'scale(1.03)'
        backCard.style.boxShadow = '0 15px 35px rgba(243, 156, 18, 0.5)'
      }
      backCard.onmouseout = () => {
        if (backCard.dataset.fullscreen !== 'true') {
          backImg.style.transform = 'scale(1)'
          backCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)'
        }
      }
      
      // 背面卡片点击放大/缩小
      backCard.onclick = () => {
        // 如果已经是全屏，则缩小
        if (backCard.dataset.fullscreen === 'true') {
          backCard.style.width = '350px'
          backCard.style.height = '525px'
          backCard.style.zIndex = '1'
          backCard.dataset.fullscreen = 'false'
          hint.textContent = '点击卡片可放大查看'
        } else {
          // 否则放大
          backCard.style.width = '80vh'
          backCard.style.height = '120vh'
          backCard.style.maxWidth = '95vw'
          backCard.style.maxHeight = '85vh'
          backCard.style.zIndex = '10'
          backCard.dataset.fullscreen = 'true'
          hint.textContent = '点击卡片可缩小查看'
          
          // 如果正面卡片是全屏，则缩小正面卡片
          if (frontCard.dataset.fullscreen === 'true') {
            frontCard.style.width = '350px'
            frontCard.style.height = '525px'
            frontCard.style.zIndex = '1'
            frontCard.dataset.fullscreen = 'false'
          }
        }
      }
      
      backCard.appendChild(backImg)
      cardsContainer.appendChild(backCard)
    }
    
    // 提示文本
    const hint = document.createElement('div')
    hint.textContent = '点击卡片可放大/缩小查看'
    hint.style.color = 'white'
    hint.style.fontSize = '14px'
    hint.style.opacity = '0.7'
    hint.style.textAlign = 'center'
    hint.style.marginTop = '15px'
    hint.style.animation = 'pulse 2s infinite'
    
    // 添加动画样式
    const styleTag = document.createElement('style')
    styleTag.textContent = `
      @keyframes pulse {
        0% { opacity: 0.4; }
        50% { opacity: 0.8; }
        100% { opacity: 0.4; }
      }
    `
    document.head.appendChild(styleTag)
    
    // 包装容器
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.alignItems = 'center'
    container.appendChild(cardsContainer)
    container.appendChild(hint)
    
    modalDiv.appendChild(container)
    
    // 关闭模态框的函数
    const closeModal = () => {
      document.body.removeChild(modalDiv)
      document.body.style.overflow = '' // 恢复页面滚动
      document.removeEventListener('keydown', handleKeyDown)
      
      // 移除样式标签
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag)
      }
      
      // 重置状态
      showImagePreviewModal.value = false
    }
    
    // 点击背景关闭
    modalDiv.addEventListener('click', (e) => {
      if (e.target === modalDiv) {
        closeModal()
      }
    })
    
    // ESC键关闭
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    
    // 添加到文档
    document.body.appendChild(modalDiv)
    
    console.log('[OH卡] 已使用原生DOM创建预览模态框')
  }

  const hideImagePreview = () => {
    console.log('[OH卡] 隐藏图片预览模态框')
    showImagePreviewModal.value = false
    
    // 移除可能存在的原生DOM预览模态框
    const nativePreview = document.getElementById('native-image-preview');
    if (nativePreview) {
      document.body.removeChild(nativePreview);
      console.log('[OH卡] 已移除原生DOM预览模态框');
    }
    
    // 移除直接创建的预览模态框
    const directPreview = document.getElementById('direct-preview-modal');
    if (directPreview) {
      document.body.removeChild(directPreview);
      console.log('[OH卡] 已移除直接创建的预览模态框');
    }
    
    // 恢复页面滚动
    document.body.style.overflow = '';
  }
  
  const toggleCardFlip = () => {
    console.log('[OH卡] 手动切换卡片翻面状态:', !isCardFlipped.value)
    isCardFlipped.value = !isCardFlipped.value
  }

  const saveCard = () => {
    // 创建一个Canvas来合并正反面卡片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置画布尺寸，足够放下两张卡片和间距
    canvas.width = 1300;
    const cardWidth = 500; // 固定卡片宽度
    const cardHeight = 750; // 固定卡片高度，保持3:2比例
    canvas.height = cardHeight + 100; // 额外高度用于标题和水印

    // 填充背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('我的OH卡', canvas.width / 2, 40);

    // 加载正面和背面图片
    const frontImg = new Image();
    const backImg = new Image();
    
    let loadedImages = 0;
    const totalImages = 2;
    
    // 图片加载完成后的处理函数
    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        // 计算卡片位置
        const margin = 50;
        const cardContainerWidth = (canvas.width - margin * 3) / 2;
        
        // 绘制正面卡片容器
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillStyle = 'white';
        
        // 调整卡片位置，确保两张卡片垂直居中且大小一致
        const x1 = margin + (cardContainerWidth - cardWidth) / 2;
        const x2 = margin * 2 + cardContainerWidth + (cardContainerWidth - cardWidth) / 2;
        const y = 70;
        
        ctx.fillRect(x1, y, cardWidth, cardHeight);
        ctx.fillRect(x2, y, cardWidth, cardHeight);
        
        // 清除阴影
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // 绘制标签
        ctx.fillStyle = '#333';
        ctx.font = 'bold 18px Arial';
        ctx.fillText("正面", x1 + cardWidth / 2, 60);
        ctx.fillText("背面", x2 + cardWidth / 2, 60);
        
        // 计算图片绘制尺寸，保持原始比例
        const calcImageDimensions = (img, containerWidth, containerHeight) => {
          const imgRatio = img.width / img.height;
          const containerRatio = containerWidth / containerHeight;
          
          let drawWidth, drawHeight;
          
          if (imgRatio > containerRatio) {
            // 图片更宽，以宽度为基准
            drawWidth = containerWidth;
            drawHeight = drawWidth / imgRatio;
          } else {
            // 图片更高，以高度为基准
            drawHeight = containerHeight;
            drawWidth = drawHeight * imgRatio;
          }
          
          // 计算居中位置
          const x = (containerWidth - drawWidth) / 2;
          const y = (containerHeight - drawHeight) / 2;
          
          return { width: drawWidth, height: drawHeight, x, y };
        };
        
        // 绘制正面卡片，确保在白色容器内居中
        const frontDim = calcImageDimensions(frontImg, cardWidth - 20, cardHeight - 20); // 留出10px边距
        ctx.drawImage(
          frontImg,
          x1 + 10 + frontDim.x, // 添加10px内边距
          y + 10 + frontDim.y,  // 添加10px内边距
          frontDim.width,
          frontDim.height
        );
        
        // 绘制背面卡片，确保在白色容器内居中
        const backDim = calcImageDimensions(backImg, cardWidth - 20, cardHeight - 20); // 留出10px边距
        ctx.drawImage(
          backImg,
          x2 + 10 + backDim.x, // 添加10px内边距
          y + 10 + backDim.y,  // 添加10px内边距
          backDim.width,
          backDim.height
        );
        
        // 添加水印
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.font = '14px Arial';
        ctx.fillText('ALiveMe OH卡 - ' + new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 15);
        
        // 转换为数据URL并触发下载
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'my-oh-card.png';
        link.href = dataUrl;
        link.click();
      }
    };
    
    // 设置图片加载完成事件
    frontImg.onload = imageLoaded;
    backImg.onload = imageLoaded;
    
    // 设置图片源
    frontImg.src = cardImageSrc.value;
    backImg.src = cardBackImageSrc.value;
  }

  const restartGame = () => {
    // 重置所有状态
    currentStep.value = 1
    currentRound.value = 0
    selectedQuestions.value = []
    selectedQuestionIndices.value = []
    currentCardNumber.value = null
    hasAnsweredQuestion.value = false
    hasDrawnCard.value = false
    isCardFlipped.value = false
    hasCompletedQuestions.value = false
    cardImageSrc.value = '/src/assets/images/material/oh/cards/back.png'
    cardBackImageSrc.value = ''
    retryCount = 0
  }

  // 图片错误处理函数
  const handleCardImageError = (e) => {
    console.error('[OH卡] 卡片图像加载失败:', e)
    cardImageError.value = true
  }

  const handleCardBackImageError = (e) => {
    console.error('[OH卡] 卡片背面图像加载失败:', e)
    cardBackImageError.value = true
  }

  const handleCardBackPreviewError = (e) => {
    console.error('[OH卡] 卡片背面预览图像加载失败:', e)
    cardBackPreviewError.value = true
  }

  // 调试辅助函数
  const toggleDebug = () => {
    showDebug.value = !showDebug.value
    console.log('[OH卡调试] 调试面板', showDebug.value ? '已显示' : '已隐藏')
  }

  const forceNextStep = () => {
    currentStep.value = (currentStep.value % 3) + 1
    console.log('[OH卡调试] 强制切换到步骤', currentStep.value)
  }

  const forceCardDraw = () => {
    console.log('[OH卡调试] 强制抽卡')
    // 使用固定的卡片编号以确保稳定性
    currentCardNumber.value = 11
    cardImageSrc.value = '/src/assets/images/material/oh/cards/back.png'
    
    setTimeout(() => {
      hasDrawnCard.value = true
      setTimeout(() => {
        try {
          cardImageSrc.value = `/src/assets/images/material/oh/cards/${currentCardNumber.value}.png`
          currentRound.value = 0
        } catch (err) {
          console.error('[OH卡调试] 强制抽卡出错:', err)
          // 使用备用图片
          cardImageSrc.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMzMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjExMCIgeT0iMTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5PSOWNoeWbvueJh+acqui/m+W8guWPkTwvdGV4dD48L3N2Zz4='
        }
      }, 800)
    }, 500)
  }

  const checkImagePaths = () => {
    console.log('[OH卡调试] 检查图片路径')
    const basePath = '/src/assets/images/material/oh/cards/'
    const paths = []
    
    for (let i = 11; i <= 19; i++) {
      try {
        const path = new URL(`${basePath}${i}.png`, import.meta.url).href
        paths.push({ num: i, path })
      } catch (err) {
        console.error(`[OH卡调试] 卡片 ${i} 路径错误:`, err)
      }
    }
    
    console.table(paths)
  }

  // 生命周期钩子
  onMounted(() => {
    // 初始化日志
    console.log('[OH卡] 组件已加载')
    console.log('[OH卡] 当前步骤:', currentStep.value)
    console.log('[OH卡] 卡片背面图片路径:', '/src/assets/images/material/oh/cards/back.png')
    
    // 验证资源路径
    try {
      const testImage = new Image()
      testImage.onload = () => console.log('[OH卡] 卡背图片加载成功')
      testImage.onerror = (err) => console.error('[OH卡] 卡背图片加载失败:', err)
      testImage.src = '/src/assets/images/material/oh/cards/back.png'
    } catch (error) {
      console.error('[OH卡] 资源路径测试失败:', error)
    }
  })

  return {
    // 状态
    currentStep,
    currentRound,
    selectedQuestions,
    selectedQuestionIndices,
    currentCardNumber,
    hasAnsweredQuestion,
    hasDrawnCard,
    isCardFlipped,
    hasCompletedQuestions,
    showConfirmationModal,
    showImagePreviewModal,
    ohCardMiniContainer,
    cardImageSrc,
    cardBackImageSrc,
    cardImageError,
    cardBackImageError,
    cardBackPreviewError,
    cardImgElement,
    cardBackImgElement,
    currentQuestions,
    showDebug,
    steps,
    questionPools,

    // 方法
    scrollToOhCardMini,
    goToStep,
    drawCard,
    selectQuestionOption,
    finishCardReading,
    createCardBackWithQuestions,
    showRedrawConfirmation,
    hideRedrawConfirmation,
    redrawCard,
    showImagePreview,
    hideImagePreview,
    toggleCardFlip,
    saveCard,
    restartGame,
    handleCardImageError,
    handleCardBackImageError,
    handleCardBackPreviewError,
    toggleDebug,
    forceNextStep,
    forceCardDraw,
    checkImagePaths
  }
} 