/* global $*/
$(document).ready(function(){
  function score_indicate(){

    let subject_points = get_subject_points();

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points.reduce(function(x,y){return x + y;})
    
    $("#sum_indicate").text(sum);
    
    // ここに、上記を参考にして平均点を出力する処理を書き込む
    let avg = (sum / subject_points.length);
    $("#avarage_indicate").text(avg);
  };

  function get_achievement(){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let avg = $("#avarage_indicate").text();
    
    let rank;
    if(avg >= 80){
        rank = "A";
    }else if(avg >= 60){
        rank = "B";
    }else if(avg >= 40){
        rank = "C";
    }else{
        rank = "D";
    }
    
    $("#evaluation").text(rank);
  }

  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = get_subject_points();
    let judge = "合格";
    for (let i=0;i<subject_points.length;i++){
        let num = subject_points[i];
        
        if (num < 60) {
            judge = "不合格";
            break;
        }
    }
    $("#judge").text(judge);
  }

  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。
    //（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。

    $('#alert-indicate').remove();
    
    let rank = $("#evaluation").text();
    let judge = $("#judge").text();
    
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${rank}です。${judge}です</label>`);
  };

  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });

  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
  
    function get_subject_points(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    
    return subject_points;
  };
});