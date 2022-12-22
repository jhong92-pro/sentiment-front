
class datasample{
    assignElement(){
 
        this.loginButtonEl = root.getElementsByTagName("button")[0]
        this.userIdEl = root.querySelector('input[name="userId"]')
        this.userPwEl = root.querySelector('input[name="userPw"]')
    }

    resetElement(){
        this.createElement()
    }

    createElement(){
        console.log("!234123")
        const root = document.getElementById("root");
        root.innerHTML = `
<section class="vh-100" style="background-color: #e2d5de;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 15px;">
          <div class="card-body p-5">
            <h1 class="mb-3">크롤링 생성하기</h1>

            <form class="d-flex justify-content-center align-items-center mb-4">
              <div class="form-outline flex-fill">
                <input type="text" id="form3" class="form-control form-control-lg" />
              </div>
            </form>

            <ul class="list-group mb-0">
              <li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <input type="text" id="form3" class="form-control border-0 form-control-md mx-2" />
                <div title="Remove item" class="">
                  <i class="fas fa-times text-primary"></i>
                </div>
              </li>

              <li class="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div class="d-flex align-items-center">
                  <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                  <s>Dapibus ac facilisis in</s>
                </div>
                <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                  <i class="fas fa-times text-primary"></i>
                </a>
              </li>
              <li class="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div class="d-flex align-items-center">
                  <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                  Morbi leo risus
                </div>
                <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                  <i class="fas fa-times text-primary"></i>
                </a>
              </li>
              <li class="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div class="d-flex align-items-center">
                  <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                  Porta ac consectetur ac
                </div>
                <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                  <i class="fas fa-times text-primary"></i>
                </a>
              </li>
              <li class="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                <div class="d-flex align-items-center">
                  <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                  Vestibulum at eros
                </div>
                <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                  <i class="fas fa-times text-primary"></i>
                </a>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div class="d-flex align-items-center">
                  <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                  Morbi leo risus
                </div>
                <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                  <i class="fas fa-times text-primary"></i>
                </a>
              </li>
            </ul>
            <div class="text-center mb-5 mt-3">
              <button type="submit" class="btn btn-info btn-md ms-2">동의어추가</button>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg ms-2">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
        `;
    }

}

export default datasample;