const fs = require('fs');
const path = require('path');

// 定义需要复制的文件映射
const copyMappings = [
  // team目录下的文件
  {
    source: 'frontend/src/assets/images/team/sunny_at_roundtable_hosting_original.jpg',
    destination: 'frontend/src/assets/images/team/sunny_at_roundtable_hosting.jpg'
  },
  {
    source: 'frontend/src/assets/images/team/sunnyonthe38meeting.jpg',
    destination: 'frontend/src/assets/images/team/sunny_at_roundtable_hosting.jpg',
    overwrite: false // 如果目标已存在，不覆盖
  },
  
  // chinese-medicine目录下的文件
  {
    source: 'frontend/src/assets/images/chinese-medicine/chinese_medicine_doctor.jpg',
    destination: 'frontend/src/assets/images/chinese-medicine/chinese_medicine_series.jpg',
    overwrite: false
  },
  
  // charity-camp目录下的文件
  {
    source: 'frontend/src/assets/images/charity-camp/公益营主讲人介绍.jpg',
    destination: 'frontend/src/assets/images/charity-camp/charity_camp_speaker_intro2.jpg',
    overwrite: false
  }
];

// 执行复制
copyMappings.forEach(mapping => {
  try {
    // 如果目标已存在并且配置为不覆盖，则跳过
    if (fs.existsSync(mapping.destination) && mapping.overwrite === false) {
      console.log(`Destination file already exists and overwrite is false: ${mapping.destination}`);
      return;
    }
    
    if (fs.existsSync(mapping.source)) {
      fs.copyFileSync(mapping.source, mapping.destination);
      console.log(`Copied: ${mapping.source} -> ${mapping.destination}`);
    } else {
      console.log(`Source file not found: ${mapping.source}`);
    }
  } catch (error) {
    console.error(`Error copying ${mapping.source} to ${mapping.destination}:`, error);
  }
});

console.log('Missing files copy process completed!'); 