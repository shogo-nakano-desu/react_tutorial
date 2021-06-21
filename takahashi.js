diff --git a/src/index.js b/src/index.js
index a81662b..7a8ee7e 100644
--- a/src/index.js
+++ b/src/index.js
@@ -57,19 +57,21 @@ const Game = () => {
   const handleClick = (i) => {
     // history: [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)},...]でで来ている。{squares: Array(9).fill(null)}は１回クリックされる毎に追加されていく。
     // timeTraveledHistory: historyをstepNumberの順番までで切り取ったもの。timeTravelした際にstepNumberがきちんと更新されればその時点のhistoryに飛べるはず。
-    setHistory(history.slice(0, stepNumber+1));
+    let historySlicedByStep = history.slice(0, stepNumber+1);
     console.log(`マス目をクリックした際のhistory: ${history}`)
     // current: 今時点のhistoryを切り出し
-    const current = history[history.length - 1];
+    const current = historySlicedByStep[historySlicedByStep.length - 1];
     // squraresは今どのマス目が何で埋まっているか。(9)[null, null, null, "o", null, "x", null, "x", null]とか
     // currentからsquaresオブジェクトを選択し、slice⇒浅いコピーを作ってsquaresとして保管
     const squares = current.squares.slice();
-    if (calculateWinner(squares) || squares[i]) {
-      return;
-    }
+    // if (calculateWinner(squares) || squares[i]) {
+    //   return;
+    // }
     squares[i] = xIsNext ? 'x' : 'o';
-    setHistory(history.concat([{squares: squares}]));
-    setStepNumber(history.length);
+    // setHistory(history.concat([{squares: squares}]));
+    // setStepNumber(history.length);
+    setHistory(historySlicedByStep.concat([{squares: squares}]));
+    setStepNumber(historySlicedByStep.length);
     setXIsNext(!xIsNext);
     console.log(`マス目をクリックした際のstepNumber ${stepNumber}`);
   };
