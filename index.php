<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type"    content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" >
  <meta name="viewport"              content="width=device-width, initial-scale=1, user-scalable=no">
  <meta name="robots"                content="noindex">

  <title>Semantic Document Editor</title>
  <link href="/index_icon.svg" type="image/svg+xml" rel="icon">

    <link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" rel="stylesheet">
<!--<link  href="https://cdn.jsdelivr.net/gh/KLA6/more-bootstrap@1.1.2/more-bootstrap.min.css"                                                                                     crossorigin="anonymous" rel="stylesheet">-->
    <link  href="https://more-bootstrap.kla6.net/k6.css"                                                                                                                                                   rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"                 integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="                     crossorigin="anonymous"></script>
<!--<script src="https://cdn.jsdelivr.net/gh/KLA6/more-jquery@0.2.0/k6.min.js"                                                                                                     crossorigin="anonymous"></script>-->
    <script src="https://more-jquery.kla6.net/k6.js"                                                                                                                                                      ></script><script> k6.config.debug = true </script>

  <link  href="/k6sde.css"          rel="stylesheet"><script src="/k6sde.js"         ></script>
  <link  href="/k6sde_server.css"   rel="stylesheet"><script src="/k6sde_server.js"  ></script>
  <link  href="/k6sde_user.css"     rel="stylesheet"><script src="/k6sde_user.js"    ></script>
  <link  href="/k6sde_book.css"     rel="stylesheet"><script src="/k6sde_book.js"    ></script>
  <link  href="/k6sde_page.css"     rel="stylesheet"><script src="/k6sde_page.js"    ></script>
  <link  href="/k6sde_part.css"     rel="stylesheet"><script src="/k6sde_part.js"    ></script>
  <link  href="/k6sde_form.css"     rel="stylesheet"><script src="/k6sde_form.js"    ></script>
  <link  href="/k6sde_markdown.css" rel="stylesheet"><script src="/k6sde_markdown.js"></script>
  <link  href="/k6sde_select.css"   rel="stylesheet"><script src="/k6sde_select.js"  ></script>
  <link  href="/k6sde_edit.css"     rel="stylesheet"><script src="/k6sde_edit.js"    ></script>
  <link  href="/k6sde_hotkey.css"   rel="stylesheet"><script src="/k6sde_hotkey.js"  ></script>
</head>
<body>

  <script>
    let sde = new k6sde()

    // sde.status.id_page_trigger       = 1  // 투두 // 문서 로드
    // sde.status.edit_keyboard_trigger = '' // 투두 // 개인 설정 적용

    setTimeout( () => {
      $( '#k6sde-offcanvas-start .offcanvas-title' ).append( $( '#test-title' ) )
      $( '#k6sde-offcanvas-start .offcanvas-body'  ).append( $( '#test-body'  ) )
    }, 0 )
  </script>

  <div    class="d-flex align-items-center" id="test-title">
    <div  class="rounded bg-secondary me-2 k6-w-1p5rem k6-h-1p5rem"></div> Nagation
  </div>
  <div       id="test-body">
    <ul   class="nav nav-tabs">
      <li class="nav-item"><a class="nav-link active bg-light fw-bold" href="#">Book</a></li>
      <li class="nav-item"><a class="nav-link"                         href="#">Part</a></li>
      <li class="nav-item"><a class="nav-link"                         href="#">Page</a></li>
    </ul>
  </div>

</body>
</html>

<? /*

  5ay.it - Semantic Document Editor (SDE)

  https://github.com/KLA6/semantic-document-editor
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde.min....
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde_server.min....
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde_user.min....
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde_book.min....
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde_page.min....
  https://cdn.jsdelivr.net/gh/KLA6/semantic-document-editor@0.0.0/k6sde_part.min....
  ...

  구조
  - 메인 웹사이트 자체가 편집기 + 블로그, 문서 등
  - 메인 웹사이트 접속 시 서비스 설명을 편집기 상에서 확인하도록...

  예제
  - 성경 : 장절 단위를 헤딩으로 작성하지만 문단으로 보이게 한다.
  - 미국 헌법
  - 한국 헌법

  유료
  - 유료 개인 : 자신 타인 작성 문서 광고 제거
  - 무료 개인 : 유료 개인 작성 문서 제외 모두 광고 노출

  오픈소스 보안
  - 리드미 파일에서 불완전 상태 경고
  - 오픈소스지만 상업 라이선스
  - 압축 .min 상태에서만 작동하는 JS 트릭

  탭 문자 > JS 공백 계산
  문서 맵

*/ ?>
