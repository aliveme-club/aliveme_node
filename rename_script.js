const fs = require('fs');
const path = require('path');

// Map of Chinese file names to English file names
const renameMap = {
  // team folder
  'sunny个人照3.jpg': 'sunny_personal_photo3.jpg',
  'sunny在圆桌会议上做主持.jpg': 'sunny_at_roundtable_hosting.jpg',
  'sunny在圆桌会议上做主持 - 原图.jpg': 'sunny_at_roundtable_hosting_original.jpg',
  'sunny个人照.jpg': 'sunny_personal_photo.jpg',
  'sunny个人照2.jpg': 'sunny_personal_photo2.jpg',
  '白熊.png': 'white_bear.png',
  '李连美.jpg': 'li_lianmei.jpg',
  '一念.jpg': 'yinian.jpg',
  '一念.png': 'yinian.png',
  '主创合照.jpg': 'creators_group_photo.jpg',

  // life-exchange folder
  '《交换人生》剧本桌游线上版获得AI应用比赛的最佳应用奖.jpg': 'life_exchange_game_ai_award.jpg',
  '《交换人生》内测合照1.jpg': 'life_exchange_beta_group_photo1.jpg',
  '《交换人生》内测合照2.jpg': 'life_exchange_beta_group_photo2.jpg',
  '《交换人生》内测拍照.jpg': 'life_exchange_beta_photo.jpg',
  '《交换人生》桌游内测实体道具.jpg': 'life_exchange_game_props.jpg',
  '盖普罗优势卡牌桌游.jpg': 'gapro_advantage_card_game.jpg',

  // events folder
  '2025年上海过年.jpg': 'shanghai_new_year_2025.jpg',
  '2025年上海过年2.jpg': 'shanghai_new_year_2025_2.jpg',
  '2025年上海过年3.jpg': 'shanghai_new_year_2025_3.jpg',
  '模速空间的现场.jpg': 'modus_space_venue.jpg',
  '无界女性海报.jpg': 'women_unlimited_poster.jpg',
  '周周黑客松与gdc大会现场.jpg': 'weekly_hackathon_gdc_venue.jpg',
  
  // aliveme folder
  '用户路线图.svg': 'user_roadmap.svg',
  'aliveme logo.jpg': 'aliveme_logo.jpg',
  'aliveme介绍与内测现场.jpg': 'aliveme_intro_beta_venue.jpg',
  
  // chinese-medicine folder
  '中医系列.jpg': 'chinese_medicine_series.jpg',
  '中医诊所负责人.jpg': 'chinese_medicine_doctor.jpg',
  
  // charity-camp folder
  'AI产品手搓-公益营海报.jpg': 'ai_product_charity_camp_poster.jpg',
  '公益营主讲人介绍2.jpg': 'charity_camp_speaker_intro2.jpg'
};

// Directory paths relative to the project root
const directoriesToProcess = [
  'frontend/src/assets/images/team',
  'frontend/src/assets/images/life-exchange',
  'frontend/src/assets/images/events',
  'frontend/src/assets/images/aliveme',
  'frontend/src/assets/images/chinese-medicine',
  'frontend/src/assets/images/charity-camp'
];

// Function to rename files
function renameFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return;
  }
  
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const oldPath = path.join(directory, file);
    
    if (renameMap[file]) {
      const newPath = path.join(directory, renameMap[file]);
      
      // Check if the file exists before attempting to rename
      if (fs.existsSync(oldPath)) {
        console.log(`Renaming: ${file} -> ${renameMap[file]}`);
        fs.renameSync(oldPath, newPath);
      } else {
        console.log(`File not found: ${oldPath}`);
      }
    }
  });
}

// Process each directory
directoriesToProcess.forEach(directory => {
  console.log(`Processing directory: ${directory}`);
  renameFiles(directory);
});

console.log('File renaming complete!');
console.log('Now update your Vue components to use the new filenames.'); 