import { Component } from '@angular/core';

@Component({
  templateUrl: 'movies.component.html',
  styleUrls: [ './movies.component.scss' ]
})

export class MoviesComponent {
  movie: any;
  movie2: any;
  colCountByScreen: object;
  Picture: string;
  Picture2: string;

  constructor() {
   this.Picture = 'https://biz.chosun.com/resizer/Q6TjcifJ8h6zsA9VKJW4vcYj4Cw=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/H3M46PSYOV3KWKORT5HBMVERCU.jpg';
   this.Picture2 = 'https://w.namu.la/s/6d857d2ae188ca3047d64baf5487b2a222a3b1601dedc19d2b038044d71fff49402b50330b014e35213e29f594cffeb9820b2fadcfa582220f7573f8c720f14411ad81a41332972c24657b895f39d2702c86ed1e2112bf232df433df78507c6409797b945e3a8056f5fe5b776f0a438e'
    this.movie = {
      ID: 7,
      director: '이상용',
      title: '범죄도시2',
      cast: '손석구, 마동석, 음문석, 박지환, 남문철',

      grade: '15세 이상',
      information: '“느낌 오지? 이 놈 잡아야 하는 거”\n' +
        '\n' +
        '가리봉동 소탕작전 후 4년 뒤,\n' +
        '금천서 강력반은 베트남으로 도주한 용의자를 인도받아 오라는 미션을 받는다.\n' +
        '\n' +
        '괴물형사 ‘마석도’(마동석)와 ‘전일만’(최귀화) 반장은 현지 용의자에게서 수상함을 느끼고,\n' +
        '그의 뒤에 무자비한 악행을 벌이는 ‘강해상’(손석구)이 있음을 알게 된다.\n' +
        '\n' +
        '‘마석도’와 금천서 강력반은 한국과 베트남을 오가며\n' +
        '역대급 범죄를 저지르는 ‘강해상’을 본격적으로 쫓기 시작하는데...\n' +
        '\n' +
        '나쁜 놈들 잡는 데 국경 없다!\n' +
        '통쾌하고 화끈한 범죄 소탕 작전이 다시 펼쳐진다!',
      runningTime: '106분'
    };

    this.movie2 = {
      ID: 8,
      director: '콜린 트레보로우',
      title: '쥬라기 월드: 도미니언',
      cast: '샘 닐, 로라 던, 제프 골드블룸, 브라이스 댈러스 하워드',

      grade: '12세 이상',
      information: '“이제 모든 것이 끝난다, 지상 최대 블록버스터의 압도적 피날레!”\n' +
        '공룡들의 터전이었던 이슬라 누블라 섬이 파괴된 후, 마침내 공룡들은 섬을 벗어나 세상 밖으로 출몰한다.\n지상에 함께 존재해선 안 될 위협적 생명체인 공룡의 등장으로 인류 역사상 겪어보지 못한 사상 최악의 위기를 맞이한 인간들. \n지구의 최상위 포식자 자리를 걸고 인간과 공룡의 최후의 사투가 펼쳐진다.\n',
      runningTime: '146분'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2
    };
  }
  public modal : boolean = false;

  clickedModalClose(){
    this.modal = false;
  }
  clickedModal(){
    this.modal = true;
  }
}
