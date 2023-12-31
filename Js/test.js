const includer111 = async (_fileName, _id) => {
  try {
    // fetch APIを使用してファイルを非同期で取得
    const _response = await fetch("include/" + _fileName); // ファイルパスからファイルを取得

    // レスポンスが正常かどうかをチェック
    if (!_response.ok) {
      throw new Error('Network response was not ok'); // ダメならエラーを投げる
    }

    const _html = await _response.text(); // レスポンスをテキストとして取得

    // ファイルの内容を指定された要素に挿入
    const _contents = document.querySelector("#" + _id); // 挿入する場所を探す
    _contents.insertAdjacentHTML("afterbegin", _html); // 一番最初に挿入

    MathJax.typesetPromise(); // MathJaxを再処理
  } catch (_error) {
    // エラー処理
    console.error('There has been a problem with your fetch operation:', _error); // エラーの内容をconsoleへ出力
  }
};



/* 別ファイルをincludeする操作 */
const includer = (_fileName, _id) => {
    /* fetch APIを使用してファイルを非同期で取得 */
    fetch("include/" + _fileName) /*ファイルパスからファイルを取得  */
      .then(_response => { /* レスポンスがresponseへ格納 */
        /* レスポンスが正常かどうかをチェック */
        if (!_response.ok) {
          throw new Error('Network response was not ok'); /* ダメならエラーを投げる */
        }
        return _response.text(); /* レスポンスをテキストとして取得 */
      })
      .then(_html => { /* 取得したテキストデータを_htmlに格納 */
        // ファイルの内容を指定された要素に挿入
        const _contents = document.querySelector("#" + _id); /* 挿入する場所を探す */
        _contents.insertAdjacentHTML("afterbegin", _html); /* 一番最初に挿入 */
        MathJax.typesetPromise(); // MathJaxを再処理
      })
      .catch(_error => { /* もしエラーがあるならerrorに格納 */
        console.error('There has been a problem with your fetch operation:', _error); /* エラーの内容をconsoleへ出力 */
      });
  };
  
/* どのページにも必要なファイルを挿入 */
/* includer111("loader.html","cover"); 
includer111("head.html","head"); 
includer111("footer.html","footer");  */
  
/* ナビゲーションバーに関しての操作 */
const includerNav = (_fileName, _id) => {
  /* fetch APIを使用してファイルを非同期で取得 */
  fetch("include/" + _fileName) /*ファイルパスからファイルを取得  */
    .then(_response => { /* レスポンスがresponseへ格納 */
      /* レスポンスが正常かどうかをチェック */
      if (!_response.ok) {
        throw new Error('Network response was not ok'); /* ダメならエラーを投げる */
      }
      return _response.text(); /* レスポンスをテキストとして取得 */
    })
    .then(_html => { /* 取得したテキストデータを_htmlに格納 */
      // ファイルの内容を指定された要素に挿入
      const _contents = document.querySelector("#" + _id); /* 挿入する場所を探す */
      _contents.insertAdjacentHTML("afterbegin", _html); /* 一番最初に挿入 */
      MathJax.typesetPromise(); // MathJaxを再処理
      const _button = document.getElementById('nav-category'); /* clickするための要素を取得 */
      const _menu = document.querySelector('.nav-dropdown'); /* ドロップダウンさせる要素を取得 */
      _button.addEventListener('click', function() {
        if (_menu.style.display === "none" || _menu.style.display === "") { /* 何もないもしくはdisplayがnoneなら表示させる。 */
          _menu.style.display = "flex"; // メニューを表示
          _menu.style.flexDirection = "column"; // 要素を縦に並べる
      } else {
          _menu.style.display = "none"; // メニューを非表示
      }
        
      })
    })
    .catch(_error => { /* もしエラーがあるならerrorに格納 */
      console.error('There has been a problem with your fetch operation:', _error); /* エラーの内容をconsoleへ出力 */
    });
};

includerNav("nav-content.html","nav"); /* ナビゲーションバーを操作と一緒に挿入 */


/* 画面の大きさに応じてサイドバーを消す操作 */
const checkViewportSize = () => {
  const _min = 800; /* 最小の幅（ピクセル単位）を設定 */
  const _viewWidth = window.innerWidth; /* 画面の大きさを取得 */
  const _sideElement = document.getElementById("side"); /* sideを探してくる */
  if (_viewWidth <= _min){
    _sideElement.style.display = "None"; /* 小さかったら画面から消す。 */
  }else{
    _sideElement.style.removeProperty("display") /* 大きかったら、displayそのものを消す。*/
  }
};
  
/* ページ読み込み時に初回実行 */
checkViewportSize();

/* ウィンドウのリサイズ時にも実行 */
window.addEventListener("resize", checkViewportSize);
  
  
/* サイドバーに関しての操作 */
const includerSide = (_file_name, _id) => {
  const _apiURL = 'https://script.google.com/macros/s/AKfycbwr2_yBunIZqw2theL2eHCCs65-DvJ3QmNEoT0na5gHALdjlq3JE_RuC2ZLlVulLTqlTg/exec';  /* GoogleスプレッドシートのAPIキー */
  // fetch APIを使用してファイルを非同期で取得
  fetch("include/" + _file_name) /*ファイルパスからファイルを取得  */
    .then(response => { /* レスポンスがresponseへ格納 */
    /* レスポンスが正常かどうかをチェック */
      if (!response.ok) {
        throw new Error('Network response was not ok'); /* ダメならエラーを投げる */
      }
      return response.text(); // レスポンスをテキストとして取得
    })
    .then(_html => { /* 取得したテキストデータを_htmlに格納 */
      /* ファイルの内容を指定された要素に挿入 */
      const _contents = document.querySelector("#" + _id); /* 挿入する場所を探す */
      _contents.insertAdjacentHTML("afterbegin", _html); /* 一番最初に挿入 */

      /* スプレッドシートのデータを取得する処理を実行 */
      loadData(_contents);
    })
    .catch(error => { /* もしエラーがあるならerrorに格納 */
      console.error('There has been a problem with your fetch operation:', error); /* エラーの内容をconsoleへ出力 */
    });

  /* スプレッドシートのデータを取得し、DOM操作を行う関数 */
  async function loadData(_contents) { /* 非同期処理の関数を定義 */
    try {
      const _response = await fetch(_apiURL); /* データを完全に取得するまで待ってapiからデータを取得 */
      if (!_response.ok) { /* エラーの確認 */
        throw new Error('Network response was not ok'); /* エラーなら投げる */
      }
      const _data = await _response.json(); /* データをjson形式に変更 */
      const _spreadsheets = _contents.querySelector('.spreadsheets'); /* 挿入する部分を探す */
      const _baseHtml = _contents.querySelector('.spreadsheets--item'); /*これから作るbaseの要素を取得  */

      // スプレッドシートのデータをDOMに追加
      for (let i = 0; i <= 3; i++) { /* 最新記事を4つ表示 */
        const _entry = _data[i]; /* スプレットシートのi番目のデータを取得 */
        const _copy = _baseHtml.cloneNode(true); /* baseの要素をコピー */
        _copy.querySelector('.spreadsheets--name').textContent = 'タイトル：' + _entry.title; /* タイトルを挿入 */
        _copy.querySelector('.link').href = _entry.link; /* linkを挿入 */
        _copy.querySelector('.spreadsheets--img').src = _entry.image; /* イメージ画像を挿入 */
        _spreadsheets.appendChild(_copy); /* 作ったものを挿入 */
      }

      /* baseHtml要素を削除 */
      _baseHtml.parentNode.removeChild(_baseHtml);

      /* ボタンのイベントリスナー等の追加のDOM操作 */
      const button = _contents.querySelector('#getWordButton'); /* ボタンの場所を探す。 */
      const serchWord = () => {
          // 入力フィールドから値を取得
        const _word = document.querySelector("#wordInput").value; /* 検索画面で入力された言葉を取得 */
        const _ans = []; /* 答えの箱を準備 */
        _data.forEach((_entry,_index) => { /* データの各要素を処理 */
          const _sentence = _entry.content; /* データのコンテンツを取得 */
          const _regex = new RegExp(_word, "g"); /* 正規表現オブジェクトを生成 グローバル(全体)の中で一致を判定 */
          const _match = _sentence.match(_regex); /* 一致している物があればTrueを返す。 */
          if (_match) { /* 一致しているかを判定 */
            _ans.push(_index); /* 一致していたらそのindexを格納 */
            console.log(_ans)
          };
          
        });
        sessionStorage.setItem("word", _word); /* セッションストレージに検索ワードをセットする。 */
        sessionStorage.setItem("ans", _ans); /* 一致していたindexをセッションストレージにセットする。 */
      }

      /* ボタンにイベントリスナーを追加 */
      button.addEventListener("click", serchWord); /* ボタンが押されたらsercWord関数を発動 */
      button.addEventListener('click', function() {
        // ページ遷移を行う
        window.location.href = 'serch-result.html';
      });

    } catch (error) { /* エラーはerrorという変数に格納 */
      console.error('There was an error fetching the spreadsheet data:', error); /* consoleにerrorを表示 */
    }
  }
};

includerSide("side.html","side") /* サイドバーを操作と一緒に挿入 */

async function someFunction() {
  try {
    await includer111("loader.html", "cover"); // loading画面
    await includer111("head.html", "head"); // head
    await includer111("footer.html", "footer"); // フッター

    const _loader = document.querySelector('.loader'); 
    if (_loader) {
      _loader.classList.add("loaded"); // load完了のクラス(laoded)を追加
    }

    setTimeout(() => {
      const _content = document.querySelector('.footerFixed'); // 記事のクラスを探してくる
      if (_content) {
        _content.style.display = 'block'; // 記事を表示
      }

      const _cover = document.querySelector('#cover'); // loadingのクラスを探してくる
      if (_cover) {
        _cover.style.display = 'none'; // 消す
      }
    }, 2000); // 消すまでの時間を設定

    console.log('includer 関数の処理が完了しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

someFunction();


