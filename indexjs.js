const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];//複数のテキストを格納する配列

let checkTexts = [];
let score = 0; //スコア初期値を決定する

const createText = () => {
  const p = document.getElementById('text');
  //配列のインデックス数からランダムな数値を生成する
  const rnd = Math.floor(Math.random() * textLists.length);

  //p要素を空っぽにする
  p.textContent = '';

  checkTexts = textLists[rnd].split('').map(value =>{
    //span要素を生成
    const span = document.createElement('span');

    //span要素に配列の1文字ずつを当てはめる
    span.textContent = value;

    //span要素をp要素に追加していく
    p.appendChild(span);

    //1文字ずつcheckTextsに格納していく
    return span;

  })
};
createText();//テキストを表示させる


const keyDown = e => {
  wrap.style.backgroundColor = '#666';
  if (e.key === checkTexts[0].textContent) {
    checkTexts[0].className = 'add-color';
   
    checkTexts.shift();
    //正しい入力の時だけスコアを加算
    score++;
    //最後まで入力したら新しいテキストを用意する
    if (!checkTexts.length) createText();
  } else if (e.key === 'Shift') {
    wrap.style.backgroundColor = '#666';
  } else {
    wrap.style.backgroundColor = 'red';
  }
};//キーイベント＆入力判定

const rankCheck = score => {
  //テキストを格納する変数を作る
  let text = '';
  //スコアに応じて異なるテキストを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;    
  }
  
  return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
};


const gameOver = id => {
  //タイマーをストップする
  clearInterval(id);
  //scoreの値をrankcheckに渡してダイアログで結果表示する
  const result = confirm(rankCheck(score));
  //OKボタンが押されるとリロードする
  if (result) window.location.reload();
};//ゲームの終了処理

const timer = () => {
  //タイマーの初期値を決定
  let time = 60;
  const count = document.getElementById('count');
  const id = setInterval(() => {
  
    //カウントがゼロになったらタイマーを停止
    if (time <= 0) gameOver(id);

    //タイマーを1ずつ減らしていく
    count.textContent = time--;
  }, 1000);
};//タイマー処理

start.addEventListener('click', () => {
  //タイマー関数を追記する
  timer();

  //ランダムなテキストを表示
  createText();

  //スタートボタンを非表示にする
  start.style.display = 'none';

  //キーボードイベントの処理
  document.addEventListener('keydown', keyDown);
 });//ゲームスタート時の処理

