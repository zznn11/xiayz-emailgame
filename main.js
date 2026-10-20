(function(){
'use strict';

var DIM_NAME = { iron:'铁腕', warm:'温情', over:'越权' };

var MAILS = [
{
  id:'m1', from:'技术保障部 岑野', initial:'岑', time:'08:32', title:'关于执行执舰官右臂机械核心深层保养的申请',
  body:['执舰官阁下：','右臂机械核心已连续运行1728标准时，神经接驳区出现0.37%迟滞。建议48小时内进行深层保养，需停用右臂并断开战术接口12小时。','此前三次预约均被您以“战备繁忙”驳回。若再延期，可能出现不可逆神经灼伤。','请批准。'],
  opts:[
    { dim:'iron', text:'批准。强制保养，不得延期。维护期间禁止签署任何出击命令，违者记过。', reply:'岑野：“……阁下，您终于想通了？我这就带约束带过去。”', result:'右臂维护 · 强制保养，禁止延期' },
    { dim:'warm', text:'批准。安排在他今晚值勤后，维护时用最高级神经镇静剂。别告诉他是我说的。', reply:'岑野：“阁下，您说‘别告诉您’？……您是不是没睡醒？不管了，我照办。”', result:'右臂维护 · 批准，最高级镇静剂' },
    { dim:'over', text:'以执舰官权限签署，保养等级从B升到S，调用医疗舰“白鲸号”待命，费用走我私人账户。', reply:'岑野：“阁下，S级保养需要军部联署。而且……您私人账户刚才已经支付了？是您本人操作的吗？”', result:'右臂维护 · 越级升为S级，调用白鲸号' }
  ]
},
{
  id:'m2', from:'后勤主管 罗西', initial:'罗', time:'08:48', title:'关于申请追加舰队季度福利经费的报告',
  body:['执舰官阁下：','第三季度深空巡航后，舰队士气指数降至C。各舰申请追加福利经费：家属通讯补贴、甜品供给、娱乐舱维护、心理干预犬只。','预算缺口12万星币。财务处说除非您签字，否则只能砍掉心理干预犬。','可犬已经上舰了。'],
  opts:[
    { dim:'iron', text:'驳回。战备优先，福利削减30%，经费转给武器维护。', reply:'罗西：“……收到。阁下，您今天是不是心情不好？”', result:'舰队福利 · 驳回，削减30%' },
    { dim:'warm', text:'全额批准。另从我个人津贴追加2万，给夜班人员加热餐。', reply:'罗西：“阁下，您上次说‘个人津贴不是舰队提款机’。……但谢谢您，我这就去办。”', result:'舰队福利 · 全额批准 + 私人追加' },
    { dim:'over', text:'批准三倍预算，从舰队预备金直接划拨，并给全舰加一天“士气假”。', reply:'罗西：“阁下，预备金需要军部批。您今天怎么比平时大方这么多？……我已经批了，但审计处会找您的。”', result:'舰队福利 · 三倍预算，全舰士气假' }
  ]
},
{
  id:'m3', from:'舰队工程师 林澈', initial:'林', time:'09:31', title:'舰队工程师婚假与宴会嘉宾邀请',
  body:['执舰官阁下：','我与医疗官沈眠申请婚假15天。想邀请您作为证婚人出席婚礼。','知道您忙，但沈眠说，如果您不来，她就不嫁了（开玩笑）。','若您能来，我们想在舰队礼堂办，希望申请一点场地和补给。'],
  opts:[
    { dim:'iron', text:'婚假批准。证婚人不出席。场地按标准，补给自费。', reply:'林澈：“……收到，阁下。沈眠说，她早就猜到您会这么批了。不过还是谢谢您。”', result:'婚假 · 批准，证婚人不出席' },
    { dim:'warm', text:'婚假批准。证婚人出席，场地升级，补给走我私人账。再送一对戒指。', reply:'林澈：“阁下……您、您确定吗？这完全超出舰队标准了。沈眠她说谢谢您，我们一定会把婚礼办好，恭候您的大驾。”', result:'婚假 · 批准，证婚人出席 + 戒指' },
    { dim:'over', text:'批准婚假30天，以执舰官名义主婚，调舰队仪仗队和巡航舰做婚舰，全舰放假半天。', reply:'林澈：“阁下，军务处刚刚打电话来问，谁批的舰队级活动……我、我按实说是您了。您……不会不认吧？”', result:'婚假 · 30天，全舰放假半天' }
  ]
},
{
  id:'m4', from:'监察部 AI-7', initial:'监', time:'09:45', title:'匿名举报：执舰官连续超时值勤',
  body:['接匿名举报：执舰官夏以昼连续在舰桥工作超过72标准时，违反舰队劳动条例。','是否立案调查？','备注：举报人附带一张照片，执舰官在指挥席上睡着了，右臂还连着战术接口。'],
  opts:[
    { dim:'iron', text:'立案。按条例处罚，强制休假，扣除本月绩效。通报全舰，以儆效尤。', reply:'监察部 AI-7：“已立案。被处罚人：夏以昼。……阁下，您处罚自己？需要我帮您申诉吗？”', result:'加班举报 · 立案，强制休假' },
    { dim:'warm', text:'不立案。发提醒函，附一句：注意身体，别让家里人担心。照片删掉。', reply:'监察部 AI-7：“已删除。……警告：您的批复风格与历史数据匹配度仅为 0.01%。另，若您需要开启‘家属关怀’白名单，请另填 OA 申请。”', result:'加班举报 · 不立案，提醒函' },
    { dim:'over', text:'立案。但处罚改为‘执舰官强制带薪休假72小时’。另外，查出匿名举报人，以执舰官名义给他发一笔‘健康监督奖金’。', reply:'监察部 AI-7：“已立案。举报人已定位：副官林曳。奖金已从您私人账户发放。……阁下，您是在用舰队系统玩过家家吗？”', result:'加班举报 · 强制带薪休假，副官获“监督奖金”' }
  ]
},
{
  id:'m5', from:'夏以昼', initial:'夏', time:'09:57', title:'执舰官私人休假审批', special:'leave',
  body:['休假类型：私人事务。','时间：明日 08:00-20:00。','事由：私人事务。','备注：若审批人（代班中）拒绝，申请人将保留申诉权利。'],
  opts:[
    { dim:'iron', text:'驳回。事由不充分，舰队执舰官不得因私废公。强制安排下周调休。', reply:'夏以昼：“……这么铁面无私？连你哥的假都敢驳？行，那我继续在舰桥加班了。”', result:'私人请假 · 驳回，强制下周调休' },
    { dim:'warm', text:'批准。并自动推掉明日所有非紧急远程会议。备注：回家陪家人。', reply:'夏以昼：“今晚尽量早点回家，困了就先休息，明天带你出去玩。”', result:'私人请假 · 批准，推掉会议' },
    { dim:'over', text:'批准。并把休假类型改成‘长期驻家办公’，开启远程指挥权限。备注：家属需要重点监护。', reply:'夏以昼：“长期驻家办公？林曳跑来问我是不是要退役了。”', result:'私人请假 · 批准，“长期驻家办公”' }
  ]
},
{
  id:'m6', from:'军部妇联 干事 洛拉', initial:'洛', time:'10:26', title:'关于高级军官参加星海联谊活动的审批',
  body:['军部举办“星海联谊”，要求单身高级军官出席。执舰官夏以昼在名单上。','若拒绝，需审批并附理由。','备注：上次您写的是“已婚”。但军部查无记录。'],
  opts:[
    { dim:'iron', text:'驳回。执舰官不参加非必要的社交活动。理由：舰队战备与深空巡航优先。', reply:'洛拉：“收到。……阁下，您之前填‘已婚’，现在写‘战备优先’。军部这边系统过不去啊，我只能给您按‘因公缺席’报上去了。”', result:'星海联谊 · 驳回，因公缺席' },
    { dim:'warm', text:'驳回。理由写：已有重要家属需要陪伴，无暇分身。', reply:'洛拉：“重要家属？……行吧阁下，我帮您把联谊推了。军部这边我顶着，祝您休假愉快。”', result:'星海联谊 · 驳回，家属陪伴' },
    { dim:'over', text:'驳回。以执舰官最高权限修改军部档案，将婚姻状况永久锁定为‘绝密’。', reply:'洛拉：“阁下！军部系统弹出了红色警报！档案状态变成了‘绝密’？……您是不是被人盗号了？”', result:'星海联谊 · 婚姻状态锁定“绝密”' }
  ]
},
{
  id:'m7', from:'训练官 雷彻', initial:'雷', time:'11:15', title:'本期新兵淘汰名单审批',
  body:['执舰官阁下：','本期新兵淘汰名单已出，共12人。其中3人表现不佳但家境困难，2人受伤。','是否按标准淘汰？请批示。'],
  opts:[
    { dim:'iron', text:'按标准淘汰。战场不看出身。', reply:'雷彻：“明白。……阁下，您今天语气比平时更冷。我还以为您会心软。”', result:'新兵淘汰 · 按标准执行' },
    { dim:'warm', text:'受伤者留用转后勤，困难者给一次补考机会。名单我亲自谈。', reply:'雷彻：“留用和补考？……阁下，这不像您的作风。不过既然您发话了，名单我改。谢谢阁下。”', result:'新兵淘汰 · 受伤留用，困难补考' },
    { dim:'over', text:'驳回淘汰。全部转入‘后勤特别观察役’，统统交给副官林曳亲自带教，去擦舰桥和扫机库。经费从我私人账户扣。', reply:'雷彻：“……阁下，让淘汰的新兵去给林副官当苦力？林副官刚发消息问我，他什么时候成新兵营保姆了？”', result:'新兵淘汰 · 驳回，转交林曳“特别观察役”' }
  ]
},
{
  id:'m8', from:'作战参谋长 顾临', initial:'顾', time:'12:33', title:'紧急：A-7编队深空暗域侦查审批', special:'a7',
  body:['执舰官阁下：','A-7编队已抵达暗域边缘。侦测到未知信号源，疑似旧文明舰骸，亦可能是陷阱。','按条例需您即时授权：是否进入？若进入，授权交战等级？','编队燃料仅够单程深入，返航需沿途补给。','等待您的指令。倒计时：10分钟。'],
  opts:[
    { dim:'iron', text:'批准进入。授权三级交战，任务优先。若遇阻，摧毁目标，不必保留。', reply:'顾临：“明白。……阁下，您今天怎么不太对？通讯器信号不好吗？”', result:'A-7编队 · 进入，三级交战' },
    { dim:'warm', text:'暂缓进入。先派无人侦察机，增派护航舰，确保全员返航路线。生命优先。', reply:'顾临：“收到。……阁下，您今天居然不说‘任务优先’了？我有点不习惯。”', result:'A-7编队 · 暂缓，侦察先行' },
    { dim:'over', text:'批准进入，并直接调动近卫舰队随行。授权使用战略武器。以执舰官名义发布。', reply:'顾临：“阁下，战略武器授权需要您本人生物认证。……您确定吗？军部已经来问了。”', result:'A-7编队 · 进入，调动近卫舰队' }
  ]
},
{
  id:'m9', from:'副官 林曳', initial:'曳', time:'15:56', title:'关于执舰官生日宴会的筹备申请',
  body:['执舰官阁下：','舰队想为您筹备生日宴会，时间下周。','您上次说“不过生日”，但今年是整岁。','请审批。是否邀请家属？'],
  opts:[
    { dim:'iron', text:'驳回。战备期间不过生日。家属不邀请。', reply:'林曳：“收到。……行吧，我去把预算批回武器部。”', result:'生日宴会 · 驳回' },
    { dim:'warm', text:'批准，小型宴会。邀请我妹妹。别搞太大。', reply:'林曳：“收到。我会安排小型宴会，亲自把家属邀请函送到您家里。”', result:'生日宴会 · 批准，邀请家属' },
    { dim:'over', text:'批准，全舰放假半天，办大型宴会，邀请军部高层。以执舰官名义发请柬。', reply:'林曳：“全舰放假半天？阁下，军务处刚才打电话来问，谁批的舰队级活动！还有，把妹妹放首席嘉宾……您这惊喜是不是搞得有点太大了？全舰队都知道您是个妹控了！”', result:'生日宴会 · 全舰放假，妹妹首席嘉宾' }
  ]
}
];

var CONTACTS_INIT = [
  { id:'momo', name:'宝贝妹妹', pinned:true, avatar:'妹', avatarClass:'', preview:'有些审批妹妹可以帮我处理一下吗', time:'08:03', unread:1 },
  { id:'linye', name:'林曳', sub:'副官', avatar:'曳', avatarClass:'alt1', preview:'暂无新消息', time:'昨天', unread:0 },
  { id:'vipor', name:'蝰蛇', sub:'作战参谋', avatar:'蝰', avatarClass:'alt2', preview:'[已拦截] 该联系人已被您拉黑', time:'昨天', unread:0, blocked:true },
  { id:'jiangfei', name:'蒋飞', sub:'后勤', avatar:'蒋', avatarClass:'alt3', preview:'暂无新消息', time:'周二', unread:0 },
  { id:'shenmian', name:'沈眠', sub:'医疗官', avatar:'沈', avatarClass:'alt1', preview:'暂无新消息', time:'周一', unread:0 },
  { id:'cenye', name:'岑野', sub:'技术保障', avatar:'岑', avatarClass:'alt2', preview:'暂无新消息', time:'周一', unread:0 }
];

var CHAT_MOMO_INIT = [
  { side:'left', text:'QAQ，宝宝，哥哥早上出门太匆忙拿错通讯器了。', time:'今天 08:03' },
  { side:'left', text:'我这边马上要执行巡航任务，今天估计要比较晚才能回家。' },
  { side:'left', text:'有些工作邮件和审批，你先帮我回一下，拿不准的截图发我。' },
  { side:'left', text:'还有，午饭已经做好放在冰箱里了，晚饭我会让人送去。' },
  { side:'left', text:'别趁我不在偷偷点冰奶茶，生理期快到了，知道不？' },
  { side:'left', text:'睡醒回个话。' }
];

var CHAT_MOMO_REPLIES = [
  { label:'交给我吧！保证完成任务，哥哥你专心巡航注意安全。', his:'乖。不用太紧张，拿不准的就放着等我回去。记得按时吃午饭。' },
  { label:'真的可以吗？万一我把你的什么重要文件批破产了怎么办……', his:'别怕，只要不是把舰队卖了，随便你点。天塌下来有哥哥顶着。' },
  { label:'hiahia那我可要翻你的手机了，看看有没有什么不能让我看的小秘密~', his:'翻吧。不过提前说好，里面除了枯燥的军务和作战日志，什么都没有。看完别嫌哥无聊。' }
];

var CHAT_A7_MSG = [
  { side:'left', text:'宝宝，邮件审批好玩吗。', time:'刚刚' },
  { side:'left', text:'我在林曳的抄送邮件上看到了A-7舰队的审批。' },
  { side:'left', text:'情况没有邮件标题上写的那么吓人，已经做好前期的准备了，同意进入即可。' },
  { side:'left', text:'中午记得按时吃饭。' },
  { side:'left', text:'要是等我下班回来发现你没好好吃饭...小心某人的屁股。' }
];

var CHAT_A7_REPLIES = [
  { label:'原来没那么吓人呀，我刚才看着倒计时都快紧张死了！不过哥哥你居然在后台偷看我的审批进度！午饭这就吃啦，别打我屁股！', his:'吓到了？没事，天塌下来哥兜得住。看你进度是因为不放心。快去吃饭，别让我说第三遍。' },
  { label:'好玩！我可是很认真在看的！(得意) 哥哥既然都准备好了那我就放心点同意啦。午饭已经在吃了，才不怕你查岗！', his:'行，算你过关。吃的是冰箱里那个保温盒对吧？乖乖吃完。等我回去检查，少一口都不行。' },
  { label:'原来林曳是个告密精！他是不是在办公室盯着我的操作后台呢？还有，哥哥你光说我，你自己在舰桥按时吃饭了吗？', his:'林曳刚才跑来问我，能不能把他的抄送权限关了，说你太吓人了。至于我？喝了支营养剂算不算？别转移话题，快去吃饭。' }
];

var CHAT_LINYE_MSG = '执舰官......是您在回邮件吗？';
var LINYE_REPLIES = [
  { label:'你看错了，是系统自动回复', his:'好的，执舰官。我什么都没看到。' },
  { label:'是我，我哥把通讯器落家里了。副官，有什么问题吗？', his:'明白了，有什么需要我配合的，随时告诉我。' },
  { label:'（沉默不回复）', his:'…………执舰官，您的回复IP在家里。' }
];

var ENDINGS = {
  iron:{
    sub:'ENDING 01', name:'钢铁执舰官', color:'#ff6b6b',
    quote:'副官刚才进来送文件，看我的眼神像在看一个冷血无情的暴君，差点没敢喘气。\n不过，驳回得干脆利落，一句废话都没有。\n你这套雷厉风行的做派，还真有哥哥几分真传。既然批都批了，那就按你的规矩办，有什么麻烦哥哥替你顶着。\n既然我们小执舰官这么有魄力，作为奖励，明天舰桥的晨会，你就坐在我的指挥席旁边旁听。\n以‘代理执舰官’的身份。\n怎么样，够威风吧？不过，要是你听不懂打瞌睡，我可是要在全舰队面前罚你的。',
    reward:''
  },
  warm:{
    sub:'ENDING 02', name:'家书抵万金', color:'#ffb47a',
    quote:'你知不知道你刚才那一通批，让全舰队的工作群都炸了？\n副官跟我汇报，说执舰官今天是不是吃错药了，批复居然这么有人情味。\n你是不是盯着那些申请，心软得一塌糊涂，大手一挥全给人家批了？\n谢谢宝宝。作为妹妹代班的奖励，明天我休假，带你去天行市新开的那家空中餐厅吃大餐。\n等吃完饭，我们去看场全息电影。明天一整天，我都只属于你。',
    reward:''
  },
  over:{
    sub:'ENDING 03', name:'全舰放假', color:'#b18cff',
    quote:'小祖宗，你知不知道我舰桥上的主控台现在警报灯闪得像个圣诞树？\n军部专线直接打到我私人频道，问我是不是打算带着整个舰队去宇宙边缘流浪。\n我看了眼后台记录，好家伙，权限拉满，流程跳过。\n你这哪里是代班，简直是打算替我把舰队掀了啊。\n行了，别心虚了。天塌下来，有哥哥顶着。剩下的烂摊子我来收，你就在家乖乖等我下班。\n至于你越权的这笔账……晚上回去，看我怎么‘审’你。\n现在，站起来去喝杯水，别一直盯着屏幕。别怕，有我呢。',
    reward:''
  }
};

var state = {};
var pendingChoice = -1;
var callTriggered = false;
var arrivalTimer = null;
var notifTimer = null;
var gameMinutes = 8*60 + 3;
var a7AlarmTimer = null;
var a7AlarmActive = false;
var chatSendTimer = null;
var selectedChatReply = -1;

function resetState(){
  state = {
    view:'mail-list',
    mailState:{},
    arrived:[],
    nextArrival:4,
    contacts: CONTACTS_INIT.map(function(c){ return Object.assign({}, c); }),
    chats: {
      momo: CHAT_MOMO_INIT.map(function(m){ return Object.assign({}, m); }),
      linye: []
    },
    momoInitReplied:false,
    a7Triggered:false,
    a7ChatReplied:false,
    a7Processed:false,
    linyeTriggered:false,
    linyeReplied:false,
    pendingA7Msg: false, 
    openMailId:null,
    openContactId:null,
    iron:0, warm:0, over:0,
    results:[],
    choice9:null,
    endingKey:null
  };
  for(var i=0;i<4;i++){
    state.arrived.push(MAILS[i].id);
    state.mailState[MAILS[i].id] = { read:false, processed:false, choice:null };
  }
  state.nextArrival = 4;
  pendingChoice = -1;
  callTriggered = false;
  selectedChatReply = -1;
  if(arrivalTimer){ clearTimeout(arrivalTimer); arrivalTimer = null; }
  if(notifTimer){ clearTimeout(notifTimer); notifTimer = null; }
  if(chatSendTimer){ clearTimeout(chatSendTimer); chatSendTimer = null; }
  clearA7Alarm();
  setClockTo(9,50);
}

var $ = function(id){ return document.getElementById(id); };
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>'); }
function pad2(n){ return (n<10?'0':'')+n; }

function showView(name){
  var views = document.querySelectorAll('.view');
  for(var i=0;i<views.length;i++){ views[i].classList.toggle('active', views[i].id === 'view-'+name); }
  state.view = name;
  var scroller = document.getElementById('view-'+name);
  if(scroller) scroller.scrollTop = 0;
  var dockBtns = document.querySelectorAll('.dock-btn');
  var activeGroup = name;
  if(name==='mail-detail') activeGroup = 'mail';
  if(name==='chat') activeGroup = 'contacts';
  if(name==='summary') activeGroup = '';
  for(var j=0;j<dockBtns.length;j++){ dockBtns[j].classList.toggle('active', dockBtns[j].getAttribute('data-view') === activeGroup); }
}

function shakeScreen(){
  var app = document.getElementById('app');
  app.classList.remove('shake'); void app.offsetWidth; app.classList.add('shake');
  setTimeout(function(){ app.classList.remove('shake'); }, 620);
  if(navigator.vibrate){ try{ navigator.vibrate([80,40,80]); }catch(e){} }
}

function parseTime(str){
  if(!str) return 0;
  var p = str.split(':');
  return parseInt(p[0],10)*60 + parseInt(p[1],10);
}
function renderClock(){
  var h = Math.floor(gameMinutes/60) % 24; var m = gameMinutes % 60;
  var clock = $('clock'); if(clock) clock.textContent = pad2(h)+':'+pad2(m);
}
function setClockTo(h, m){ gameMinutes = h*60 + m; renderClock(); }
function syncClockTo(timeStr){
  var t = parseTime(timeStr);
  if(t > gameMinutes){ gameMinutes = t; renderClock(); }
}
function advanceClock(min){ gameMinutes += min; renderClock(); }

function getPendingCount(){
  var count = 0;
  for(var i=0;i<state.arrived.length;i++){
    var st = state.mailState[state.arrived[i]];
    if(!st || !st.processed) count++;
  }
  return count;
}

function updateBadges(){
  var pending = getPendingCount();
  var bm = $('badge-mail');
  if(pending > 0){ bm.textContent = pending; bm.classList.remove('hidden'); } else bm.classList.add('hidden');

  var unreadContacts = 0;
  for(var k=0;k<state.contacts.length;k++){ if(state.contacts[k].unread > 0) unreadContacts += state.contacts[k].unread; }
  var bc = $('badge-contacts');
  if(unreadContacts > 0){
    bc.textContent = unreadContacts; bc.classList.remove('hidden');
    var momoUnread = 0;
    for(var m=0;m<state.contacts.length;m++){ if(state.contacts[m].id === 'momo') momoUnread = state.contacts[m].unread; }
    if(momoUnread > 0) bc.classList.add('special'); else bc.classList.remove('special');
  } else { bc.classList.add('hidden'); bc.classList.remove('special'); }

  var mc = $('mailCount'); if(mc) mc.textContent = pending + ' 封待处理';
}

function showNotification(kind, text, onClick){
  var el = $('notif-banner'); el.className = kind;
  $('notifIcon').textContent = kind === 'mail' ? '✉' : (kind === 'special' ? '★' : '💬');
  $('notifLabel').textContent = kind === 'mail' ? '新邮件' : (kind === 'special' ? '特别关注' : '通讯消息');
  $('notifText').textContent = text;
  el.classList.add('show');
  el.onclick = function(){ el.classList.remove('show'); if(onClick) onClick(); };
  if(notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(function(){ el.classList.remove('show'); }, 5200);
}

function startA7AlarmCountdown(){
  if(a7AlarmActive || a7AlarmTimer) return;
  a7AlarmTimer = setTimeout(function(){
    a7AlarmTimer = null;
    if(state.a7Processed) return;
    a7AlarmActive = true;
    showA7AlarmBanner();
    shakeScreen();
  }, 5000);
}
function showA7AlarmBanner(){
  var el = $('alarm-banner'); el.classList.add('show');
  el.onclick = function(){ openMail('m8'); };
}
function clearA7Alarm(){
  if(a7AlarmTimer){ clearTimeout(a7AlarmTimer); a7AlarmTimer = null; }
  a7AlarmActive = false;
  var el = $('alarm-banner'); if(el) el.classList.remove('show');
}

function runAuth(){
  var icon = $('authIcon'); var text = $('authText');
  setTimeout(function(){ icon.textContent = '✓'; icon.classList.add('done'); text.textContent = '验证通过'; text.classList.add('done'); }, 1500);
  setTimeout(function(){ $('auth-overlay').classList.add('hidden'); }, 2100);
}

function findMail(id){ for(var i=0;i<MAILS.length;i++){ if(MAILS[i].id===id) return MAILS[i]; } return null; }

function renderMailList(){
  var area = $('mailListArea');
  if(state.arrived.length === 0){ area.innerHTML = '<div class="empty-tip">收件箱为空</div>'; return; }
  var html = ''; var list = state.arrived.slice().reverse();
  for(var i=0;i<list.length;i++){
    var id = list[i]; var mail = findMail(id); if(!mail) continue;
    var st = state.mailState[id] || {}; var unread = !st.read;
    var isUrgent = (mail.special === 'a7') && !st.processed;
    var cls = 'mail-item'; if(unread) cls += ' unread'; if(isUrgent) cls += ' urgent';
    html += '<div class="'+cls+'" data-mail="'+id+'">';
    if(unread && !isUrgent) html += '<div class="unread-dot"></div>';
    if(isUrgent) html += '<div class="urgent-tag">⚠ 紧急</div>';
    html +=   '<div class="mail-avatar">'+esc(mail.initial)+'</div>';
    html +=   '<div class="mail-main">';
    html +=     '<div class="mail-row1"><span class="mail-sender">'+esc(mail.from)+'</span><span class="mail-time">'+esc(mail.time)+'</span></div>';
    html +=     '<div class="mail-title">'+esc(mail.title)+'</div>';
    html +=   '</div>';
    if(isUrgent) html += '<div class="urgent-bell">🔔</div>';
    html += '</div>';
  }
  area.innerHTML = html;
  var items = area.querySelectorAll('.mail-item');
  for(var k=0;k<items.length;k++){ items[k].addEventListener('click', function(){ openMail(this.getAttribute('data-mail')); }); }
  updateBadges();
}

function openMail(id){
  var mail = findMail(id); if(!mail) return;
  state.openMailId = id;
  var st = state.mailState[id];
  if(!st){ st = state.mailState[id] = { read:false, processed:false, choice:null }; }
  if(!st.read){ st.read = true; updateBadges(); }
  renderMailDetail(mail);
  showView('mail-detail');

  if(mail.special === 'a7'){
    if(!state.a7Triggered) triggerA7Chat();
    if(!st.processed && !state.a7Processed) startA7AlarmCountdown();
  }
}

function renderMailDetail(mail){
  var st = state.mailState[mail.id] || {};
  var isA7 = mail.special === 'a7';
  var isUrgent = isA7 && !st.processed;

  var html = '';
  html += '<div class="mail-detail'+(isUrgent?' urgent':'')+'">';
  html +=   '<div class="md-meta">';
  if(isA7) html += '<span class="md-tag urgent">⚠ 紧急 · 军务</span>';
  else html += '<span class="md-tag blue">密件</span>';
  html +=     '<span class="md-from">FROM / '+esc(mail.from)+'</span>';
  html +=   '</div>';
  html +=   '<h2 class="md-title">'+esc(mail.title)+'</h2>';
  html +=   '<div class="md-body">';
  for(var i=0;i<mail.body.length;i++){ html += '<p>'+esc(mail.body[i])+'</p>'; }
  html +=   '</div>';
  if(isUrgent){
    html += '<div class="alarm-strip"><div class="alarm-strip-icon">⏰</div><div class="alarm-strip-text"><b>倒计时中</b> · 请尽快处理此审批</div></div>';
  }
  html += '</div>';

  if(st.processed){
    var chosenOpt = mail.opts[st.choice];
    html += '<div class="reply-box"><div class="reply-head">终端回执</div><div class="reply-text">'+esc(chosenOpt.reply)+'</div></div>';
    html += '<button class="next-btn" id="backToListBtn">返回收件箱</button>';
  } else {
    html += '<div id="optWrap">';
    for(var j=0;j<mail.opts.length;j++){
      var o = mail.opts[j];
      html += '<button class="opt '+o.dim+'" data-opt="'+j+'" style="animation-delay:'+(j*0.06)+'s;">';
      html +=   '<span class="opt-dim">'+DIM_NAME[o.dim]+'</span><span class="opt-text">'+esc(o.text)+'</span></button>';
    }
    html += '</div><button class="confirm-btn hidden" id="confirmOptBtn">确认回复</button>';
  }

  $('mailDetailArea').innerHTML = html;

  var back = $('backToListBtn');
  if(back){ back.addEventListener('click', function(){ showView('mail-list'); renderMailList(); tryArrival(); }); }

  var optBtns = $('mailDetailArea').querySelectorAll('.opt');
  for(var k=0;k<optBtns.length;k++){
    optBtns[k].addEventListener('click', function(){ selectOpt(mail.id, parseInt(this.getAttribute('data-opt'),10)); });
  }

  var confirmBtn = $('confirmOptBtn');
  if(confirmBtn){ confirmBtn.addEventListener('click', function(){ if(pendingChoice >= 0) chooseOpt(mail.id, pendingChoice); }); }
}

function selectOpt(mailId, idx){
  var st = state.mailState[mailId]; if(!st || st.processed) return;
  pendingChoice = idx;
  var optBtns = $('mailDetailArea').querySelectorAll('.opt');
  for(var i=0;i<optBtns.length;i++){ optBtns[i].classList.toggle('chosen', i === idx); }
  var confirmBtn = $('confirmOptBtn');
  if(confirmBtn){ confirmBtn.classList.remove('hidden'); confirmBtn.scrollIntoView({behavior:'smooth', block:'nearest'}); }
}

function chooseOpt(mailId, idx){
  var mail = findMail(mailId); var st = state.mailState[mailId];
  if(!st || st.processed) return;
  var opt = mail.opts[idx];

  st.processed = true; st.choice = idx;
  if(opt.dim==='iron') state.iron++; else if(opt.dim==='warm') state.warm++; else state.over++;
  if(mailId === 'm5') state.choice9 = opt.dim;
  state.results.push(opt.result);

  if(mailId === 'm8'){ state.a7Processed = true; clearA7Alarm(); }

  var optBtns = $('mailDetailArea').querySelectorAll('.opt');
  for(var i=0;i<optBtns.length;i++){
    optBtns[i].disabled = true;
    if(i===idx) optBtns[i].classList.add('chosen'); else optBtns[i].classList.add('dimmed');
  }
  var confirmBtn = $('confirmOptBtn'); if(confirmBtn) confirmBtn.classList.add('hidden');

  var wrap = $('optWrap');
  if(wrap){
    var reply = document.createElement('div'); reply.className = 'reply-box';
    reply.innerHTML = '<div class="reply-head">终端回执</div><div class="reply-text">'+esc(opt.reply)+'</div>';
    wrap.parentNode.insertBefore(reply, wrap.nextSibling);
    var nb = document.createElement('button'); nb.className = 'next-btn'; nb.id = 'backToListBtn'; nb.textContent = '返回收件箱';
    nb.addEventListener('click', function(){ showView('mail-list'); renderMailList(); tryArrival(); });
    reply.parentNode.insertBefore(nb, reply.nextSibling);
  }

  advanceClock(5);
  updateBadges();

  var processedCount = 0;
  for(var p=0;p<MAILS.length;p++){ var ps = state.mailState[MAILS[p].id]; if(ps && ps.processed) processedCount++; }
  if(processedCount >= 5 && !state.linyeTriggered){ triggerLinyeMessage(); }

  setTimeout(checkAllDone, 600);
}

function tryArrival(){
  if(arrivalTimer) return; if(state.nextArrival >= MAILS.length) return;
  arrivalTimer = setTimeout(function(){
    arrivalTimer = null;
    var nextMail = MAILS[state.nextArrival];
    if(state.arrived.indexOf(nextMail.id) >= 0){ state.nextArrival++; tryArrival(); return; }
    state.arrived.push(nextMail.id);
    state.mailState[nextMail.id] = { read:false, processed:false, choice:null };
    state.nextArrival++;
    syncClockTo(nextMail.time);
    updateBadges();
    if(state.view === 'mail-list') renderMailList();
    var label = (nextMail.special === 'a7') ? '⚠ 紧急：' + nextMail.from : nextMail.from;
    showNotification('mail', label+'：'+nextMail.title, function(){ openMail(nextMail.id); });
  }, 4000);
}

function checkAllDone(){
  if(callTriggered) return;
  var allDone = true;
  for(var i=0;i<MAILS.length;i++){ var st = state.mailState[MAILS[i].id]; if(!st || !st.processed){ allDone = false; break; } }
  if(allDone){ callTriggered = true; clearA7Alarm(); setTimeout(triggerCall, 900); }
}

function renderContacts(){
  var area = $('contactListArea'); var html = '';
  for(var i=0;i<state.contacts.length;i++){
    var c = state.contacts[i];
    var cls = 'contact-item';
    if(c.pinned) cls += ' pinned';
    if(c.id === 'momo') cls += ' special';
    if(c.blocked) cls += ' blocked';

    html += '<div class="'+cls+'" data-contact="'+c.id+'">';
    html +=   '<div class="contact-avatar '+(c.avatarClass||'')+'">'+esc(c.avatar)+'</div>';
    html +=   '<div class="contact-info">';
    html +=     '<div class="contact-name">'+esc(c.name)+(c.pinned?'<span class="pin">置顶</span>':'')+'</div>';
    html +=     '<div class="contact-preview">'+esc(c.preview)+'</div>';
    html +=   '</div>';
    html +=   '<div class="contact-right"><span class="contact-time">'+esc(c.time)+'</span>';
    if(c.unread>0) html += '<span class="contact-badge">'+c.unread+'</span>';
    html +=   '</div></div>';
  }
  area.innerHTML = html;
  var items = area.querySelectorAll('.contact-item');
  for(var k=0;k<items.length;k++){
    items[k].addEventListener('click', function(){ openChat(this.getAttribute('data-contact')); });
  }
}

function openChat(contactId){
  var contact = null;
  for(var i=0;i<state.contacts.length;i++){ if(state.contacts[i].id === contactId){ contact = state.contacts[i]; break; } }
  if(!contact) return;

  if(contact.blocked){
    showNotification('chat', '系统提示：该联系人已被您拉黑，消息无法送达。', function(){});
    return;
  }

  state.openContactId = contactId;
  if(contact.unread>0){ contact.unread = 0; updateBadges(); }

  $('chatTitle').textContent = contact.name;
  var sub = $('chatSub');
  if(contactId === 'momo' || contactId === 'linye'){ sub.textContent = '● 在线'; sub.style.color = '#6ee7b7'; }
  else { sub.textContent = '加密频道'; sub.style.color = 'var(--cyan-d)'; }

  selectedChatReply = -1;
  
  var body = $('chatBody'); var replyArea = $('chatReplyArea');
  body.innerHTML = ''; replyArea.innerHTML = '';
  var msgs = state.chats[contactId] || [];
  
  var html = '';
  for(var i=0; i<msgs.length; i++){
    var m = msgs[i];
    if(m.time) html += '<div class="chat-time">'+esc(m.time)+'</div>';
    var bcls = 'bubble ' + (m.side==='right'?'right':'left');
    if(contactId === 'momo') bcls += ' special';
    html += '<div class="'+bcls+'">'+esc(m.text)+'</div>';
  }
  body.innerHTML = html;
  renderReplies(contactId, replyArea);
  showView('chat');
  scrollChatBottom();
}

function renderReplies(contactId, replyArea) {
  var html = '';
  if(contactId === 'momo'){
    if(!state.momoInitReplied){
      html = '<div class="chat-reply-label">—— 选择回复 ——</div>';
      for(var r=0;r<CHAT_MOMO_REPLIES.length;r++){
        var sel = (selectedChatReply === r) ? ' selected' : '';
        html += '<button class="chat-reply-btn'+sel+'" data-momoreply="'+r+'">'+esc(CHAT_MOMO_REPLIES[r].label)+'</button>';
      }
      html += '<button class="send-btn hidden" id="sendMomoBtn">发送</button>';
    } else if(state.a7Triggered && !state.a7ChatReplied){
      html = '<div class="chat-reply-label">—— 选择回复 ——</div>';
      for(var a=0;a<CHAT_A7_REPLIES.length;a++){
        var sel = (selectedChatReply === a) ? ' selected' : '';
        html += '<button class="chat-reply-btn'+sel+'" data-a7reply="'+a+'">'+esc(CHAT_A7_REPLIES[a].label)+'</button>';
      }
      html += '<button class="send-btn hidden" id="sendA7Btn">发送</button>';
    } else if(state.a7Triggered && state.a7ChatReplied){
      html = '<div class="chat-reply-label">—— 消息已送达 ——</div>';
      html += '<button class="chat-reply-btn" id="backToMailFromChat">返回邮件继续审批 →</button>';
    }
  } else if(contactId === 'linye') {
    if(state.linyeTriggered && !state.linyeReplied){
      html = '<div class="chat-reply-label">—— 选择回复 ——</div>';
      for(var l=0;l<LINYE_REPLIES.length;l++){
        var sel = (selectedChatReply === l) ? ' selected' : '';
        html += '<button class="chat-reply-btn'+sel+'" data-linyereply="'+l+'">'+esc(LINYE_REPLIES[l].label)+'</button>';
      }
      html += '<button class="send-btn hidden" id="sendLinyeBtn">发送</button>';
    } else if(state.linyeReplied){
      html = '<div class="chat-reply-label">—— 消息已送达 ——</div>';
      html += '<button class="chat-reply-btn" id="backToMailFromLinye">返回邮件继续审批 →</button>';
    }
  }

  replyArea.innerHTML = html;
  if (contactId === 'momo') {
    if (!state.momoInitReplied) { bindMomoInitReplies(); }
    else if (state.a7Triggered && !state.a7ChatReplied) { bindA7Replies(); }
    else if (state.a7Triggered && state.a7ChatReplied) {
      var bb = $('backToMailFromChat'); if(bb) bb.addEventListener('click', function(){ openMail('m8'); });
    }
  } else if (contactId === 'linye') {
    if (state.linyeTriggered && !state.linyeReplied) { bindLinyeReplies(); }
    else if (state.linyeReplied) {
      var bl = $('backToMailFromLinye'); if(bl) bl.addEventListener('click', function(){ showView('mail-list'); renderMailList(); tryArrival(); });
    }
  }
}

function scrollChatBottom(){ var scroller = $('view-chat'); setTimeout(function(){ scroller.scrollTop = scroller.scrollHeight; }, 60); }

function bindMomoInitReplies(){
  var btns = $('chatReplyArea').querySelectorAll('.chat-reply-btn[data-momoreply]');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click', function(){
      selectedChatReply = parseInt(this.getAttribute('data-momoreply'),10);
      for(var k=0;k<btns.length;k++) btns[k].classList.remove('selected');
      this.classList.add('selected');
      $('sendMomoBtn').classList.remove('hidden');
    });
  }
  var sendBtn = $('sendMomoBtn');
  if(sendBtn) sendBtn.addEventListener('click', handleMomoSend);
}

function handleMomoSend(){
  if(selectedChatReply < 0) return;
  var idx = selectedChatReply;
  var rep = CHAT_MOMO_REPLIES[idx];
  
  $('chatReplyArea').innerHTML = '';
  
  var body = $('chatBody');
  body.insertAdjacentHTML('beforeend', '<div class="bubble right">'+esc(rep.label)+'</div>');
  state.chats.momo.push({ side:'right', text:rep.label });
  scrollChatBottom();

  var typingId = 'typing-' + Date.now();
  body.insertAdjacentHTML('beforeend', '<div id="'+typingId+'" class="bubble left typing-indicator"><span></span><span></span><span></span></div>');
  scrollChatBottom();

  setTimeout(function(){
    var t = document.getElementById(typingId); if(t) t.remove();
    body.insertAdjacentHTML('beforeend', '<div class="bubble left special">'+esc(rep.his)+'</div>');
    state.chats.momo.push({ side:'left', text:rep.his });
    state.momoInitReplied = true;
    scrollChatBottom();

    if (state.pendingA7Msg) {
       setTimeout(function(){ triggerA7ChatAnim(); }, 1000);
    } else {
       renderReplies('momo', $('chatReplyArea'));
    }
  }, 1500);
}

function bindA7Replies(){
  var btns = $('chatReplyArea').querySelectorAll('.chat-reply-btn[data-a7reply]');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click', function(){
      selectedChatReply = parseInt(this.getAttribute('data-a7reply'),10);
      for(var k=0;k<btns.length;k++) btns[k].classList.remove('selected');
      this.classList.add('selected');
      $('sendA7Btn').classList.remove('hidden');
    });
  }
  var sendBtn = $('sendA7Btn');
  if(sendBtn) sendBtn.addEventListener('click', handleA7Send);
}

function handleA7Send(){
  if(selectedChatReply < 0) return;
  var idx = selectedChatReply;
  var rep = CHAT_A7_REPLIES[idx];

  $('chatReplyArea').innerHTML = '';

  var body = $('chatBody');
  body.insertAdjacentHTML('beforeend', '<div class="bubble right">'+esc(rep.label)+'</div>');
  state.chats.momo.push({ side:'right', text:rep.label });
  scrollChatBottom();

  var typingId = 'typing-' + Date.now();
  body.insertAdjacentHTML('beforeend', '<div id="'+typingId+'" class="bubble left typing-indicator"><span></span><span></span><span></span></div>');
  scrollChatBottom();

  setTimeout(function(){
    var t = document.getElementById(typingId); if(t) t.remove();
    body.insertAdjacentHTML('beforeend', '<div class="bubble left special">'+esc(rep.his)+'</div>');
    state.chats.momo.push({ side:'left', text:rep.his });
    state.a7ChatReplied = true;
    scrollChatBottom();
    renderReplies('momo', $('chatReplyArea'));
  }, 1500);
}

function bindLinyeReplies(){
  var btns = $('chatReplyArea').querySelectorAll('.chat-reply-btn[data-linyereply]');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click', function(){
      selectedChatReply = parseInt(this.getAttribute('data-linyereply'),10);
      for(var k=0;k<btns.length;k++) btns[k].classList.remove('selected');
      this.classList.add('selected');
      $('sendLinyeBtn').classList.remove('hidden');
    });
  }
  var sendBtn = $('sendLinyeBtn');
  if(sendBtn) sendBtn.addEventListener('click', handleLinyeSend);
}

function handleLinyeSend(){
  if(selectedChatReply < 0) return;
  var idx = selectedChatReply;
  var rep = LINYE_REPLIES[idx];

  $('chatReplyArea').innerHTML = '';

  var body = $('chatBody');
  body.insertAdjacentHTML('beforeend', '<div class="bubble right">'+esc(rep.label)+'</div>');
  state.chats.linye.push({ side:'right', text:rep.label });
  scrollChatBottom();

  var typingId = 'typing-' + Date.now();
  body.insertAdjacentHTML('beforeend', '<div id="'+typingId+'" class="bubble left typing-indicator"><span></span><span></span><span></span></div>');
  scrollChatBottom();

  setTimeout(function(){
    var t = document.getElementById(typingId); if(t) t.remove();
    body.insertAdjacentHTML('beforeend', '<div class="bubble left">'+esc(rep.his)+'</div>');
    state.chats.linye.push({ side:'left', text:rep.his });
    state.linyeReplied = true;
    scrollChatBottom();
    renderReplies('linye', $('chatReplyArea'));
  }, 1500);
}

function triggerA7Chat(){
  state.a7Triggered = true;
  setTimeout(function(){
    if (!state.momoInitReplied) {
      state.pendingA7Msg = true;
      showNotification('special', '宝贝妹妹发来新消息', function(){ openChat('momo'); });
      shakeScreen();
      for(var c=0;c<state.contacts.length;c++){
        if(state.contacts[c].id === 'momo'){
          state.contacts[c].unread = 1; 
          break;
        }
      }
      updateBadges();
    } else {
      triggerA7ChatAnim();
    }
  }, 800);
}

function triggerA7ChatAnim() {
  state.pendingA7Msg = false;
  
  if (state.view === 'chat' && state.openContactId === 'momo') {
    var replyArea = $('chatReplyArea'); replyArea.innerHTML = '';
    var body = $('chatBody');
    var idx = 0;

    var showNext = function() {
      if (idx >= CHAT_A7_MSG.length) {
        for(var c=0;c<state.contacts.length;c++){
          if(state.contacts[c].id === 'momo'){ state.contacts[c].preview = '宝宝，邮件审批好玩吗...'; state.contacts[c].time = '刚刚'; break; }
        }
        updateBadges();
        shakeScreen();
        renderReplies('momo', replyArea);
        return;
      }

      var typingId = 'typing-' + Date.now();
      body.insertAdjacentHTML('beforeend', '<div id="'+typingId+'" class="bubble left typing-indicator"><span></span><span></span><span></span></div>');
      scrollChatBottom();

      setTimeout(function(){
        var t = document.getElementById(typingId); if(t) t.remove();
        
        var m = CHAT_A7_MSG[idx];
        var h = '';
        if(m.time) h += '<div class="chat-time">'+esc(m.time)+'</div>';
        h += '<div class="bubble left special">'+esc(m.text)+'</div>';
        body.insertAdjacentHTML('beforeend', h);
        state.chats.momo.push({ side:'left', text:m.text, time:m.time });
        
        scrollChatBottom();
        idx++;
        setTimeout(showNext, 700);
      }, 500);
    };
    
    showNext();

  } else {
    for(var k=0;k<CHAT_A7_MSG.length;k++){ state.chats.momo.push(Object.assign({}, CHAT_A7_MSG[k])); }
    for(var c=0;c<state.contacts.length;c++){
      if(state.contacts[c].id === 'momo'){
        state.contacts[c].unread = 1; state.contacts[c].preview = '宝宝，邮件审批好玩吗...'; state.contacts[c].time = '刚刚';
        break;
      }
    }
    updateBadges();
    showNotification('special', '宝贝妹妹：宝宝，邮件审批好玩吗', function(){ openChat('momo'); });
    shakeScreen();
  }
}

function triggerLinyeMessage(){
  state.linyeTriggered = true;
  setTimeout(function(){
    state.chats.linye.push({ side:'left', text:CHAT_LINYE_MSG, time:'刚刚' });
    for(var c=0;c<state.contacts.length;c++){
      if(state.contacts[c].id === 'linye'){
        state.contacts[c].unread = 1; state.contacts[c].preview = CHAT_LINYE_MSG; state.contacts[c].time = '刚刚';
        break;
      }
    }
    updateBadges();
    showNotification('chat', '林曳：'+CHAT_LINYE_MSG, function(){ openChat('linye'); });
  }, 1000);
}

var callTimerInterval = null;
var callSeconds = 0;

function decideEnding(){
  if(state.over >= 5) return 'over';
  if(state.iron > state.warm) return 'iron';
  if(state.warm > state.iron) return 'warm';
  return (state.choice9 === 'iron') ? 'iron' : 'warm';
}

function triggerCall(){
  state.endingKey = decideEnding();
  var ed = ENDINGS[state.endingKey];
  var overlay = $('call-overlay');
  overlay.classList.remove('hidden');
  $('callSubtitle').innerHTML = '';
  $('callEndBtn').classList.add('hidden');

  callSeconds = 0; $('callStatus').textContent = '通话中 · 00:00'; $('callStatus').classList.add('live');
  if(callTimerInterval) clearInterval(callTimerInterval);
  callTimerInterval = setInterval(function(){
    callSeconds++;
    var m = Math.floor(callSeconds/60); var s = callSeconds%60;
    $('callStatus').textContent = '通话中 · '+pad2(m)+':'+pad2(s);
  }, 1000);

  var lines = ed.quote.split('\n');
  var delay = 1500;
  lines.forEach(function(line, i){
    if(!line.trim()) return;
    setTimeout(function(){
      var el = document.createElement('div'); el.className = 'sub-line his'; el.textContent = line;
      $('callSubtitle').appendChild(el);
      el.scrollIntoView({behavior:'smooth', block:'end'});
      if(i === lines.length-1){ $('callEndBtn').classList.remove('hidden'); }
    }, delay + i*1500);
  });
}

$('callEndBtn').addEventListener('click', function(){
  if(callTimerInterval){ clearInterval(callTimerInterval); callTimerInterval = null; }
  $('call-overlay').classList.add('hidden');
  renderSummary(); showView('summary');
});

function renderSummary(){
  var key = state.endingKey || decideEnding();
  var ed = ENDINGS[key];
  var html = '';
  html += '<div class="summary-head"><div class="summary-sub">'+ed.sub+' · 审批汇总</div><h1 class="summary-name" style="color:'+ed.color+'">'+ed.name+'</h1></div>';
  html += '<div class="summary-block"><h3>本次代理审批记录</h3>';
  for(var i=0;i<state.results.length;i++){ html += '<div class="result-item"><span class="bullet">▸</span><span>'+esc(state.results[i])+'</span></div>'; }
  html += '</div>';
  html += '<div class="summary-block"><h3>维度统计</h3>';
  html += '<div class="result-item"><span class="bullet">铁</span><span>铁腕 · '+state.iron+' 次</span></div>';
  html += '<div class="result-item"><span class="bullet">温</span><span>温情 · '+state.warm+' 次</span></div>';
  html += '<div class="result-item"><span class="bullet">越</span><span>越权 · '+state.over+' 次</span></div></div>';
  html += '<button class="restart-btn" id="restartBtn">重新载入终端</button><div class="end-footer">—— 执舰官代理日志 · 完 ——</div>';
  $('view-summary').innerHTML = html;

  $('restartBtn').addEventListener('click', function(){
    if(callTimerInterval){ clearInterval(callTimerInterval); callTimerInterval = null; }
    if(arrivalTimer){ clearTimeout(arrivalTimer); arrivalTimer = null; }
    if(notifTimer){ clearTimeout(notifTimer); notifTimer = null; }
    if(chatSendTimer){ clearTimeout(chatSendTimer); chatSendTimer = null; }
    callTriggered = false;
    resetState();
    $('call-overlay').classList.add('hidden'); $('callSubtitle').innerHTML = ''; $('callEndBtn').classList.add('hidden');
    showView('mail-list'); renderMailList(); updateBadges();
  });
}

$('mailBackBtn').addEventListener('click', function(){ showView('mail-list'); renderMailList(); tryArrival(); });
$('chatBackBtn').addEventListener('click', function(){ showView('contacts'); renderContacts(); });
document.querySelectorAll('.dock-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var v = this.getAttribute('data-view');
    if(v === 'mail'){ showView('mail-list'); renderMailList(); }
    else if(v === 'contacts'){ showView('contacts'); renderContacts(); }
    else if(v === 'settings'){ showView('settings'); }
  });
});

resetState();
runAuth();
showView('mail-list');
renderMailList();
updateBadges();

})();