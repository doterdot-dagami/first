import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

// すべてのWaveSurferインスタンスを管理するための配列
const allInstances = [];

// HTMLにあるプレイヤーの要素をすべてループ処理する
document.querySelectorAll('.player-item').forEach((item) => {
    // HTMLから曲のパスと、その曲のテーマカラーを取得する
    const audioUrl = item.getAttribute('data-src');
    const themeColor = item.getAttribute('data-color');
    
    // このプレイヤーの中にあるボタンと波形コンテナを取得する
    const playBtn = item.querySelector('.play-btn');
    const container = item.querySelector('.waveform-container');

    // 💡 ボタンの背景色を、その曲のテーマカラーに設定する
    playBtn.style.backgroundColor = themeColor;

    // 💡 このプレイヤー専用のWaveSurferを作成する
    const wavesurfer = WaveSurfer.create({
        container: container,
        url: audioUrl,
        waveColor: '#e5e7eb',        // 未再生：薄いグレー
        progressColor: themeColor,   // 再生済：HTMLで指定したテーマカラー！
        cursorColor: themeColor,
        cursorWidth: 2,
        normalize: true,
        barWidth: null,              // 綺麗な1枚の海苔（長方形）にする
        height: 40,                  // スタイリッシュな細めのバー
    });

    // 管理用配列に保存しておく（後で他の曲を止めるために必要）
    allInstances.push(wavesurfer);

    // 再生ボタンをクリックした時の処理
    playBtn.addEventListener('click', () => {
        // 💡 もしこれが再生されたら、他の鳴っているプレイヤーを全部一時停止する
        if (!wavesurfer.isPlaying()) {
            allInstances.forEach((instance) => {
                if (instance !== wavesurfer) instance.pause();
            });
        }
        
        // 再生・一時停止の切り替え
        wavesurfer.playPause();
    });

    // 再生状態に合わせてボタンの文字を切り替える
    wavesurfer.on('play', () => {
        playBtn.textContent = '一時停止';
    });
    wavesurfer.on('pause', () => {
        playBtn.textContent = '再生';
    });
});





