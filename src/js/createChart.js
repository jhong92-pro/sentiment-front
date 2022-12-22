import axios from '../../node_modules/axios/dist/axios.js';
let serverUrl = 'env.serverUrl'

class createChart{
    resetElement(){
        this.createElement()
        this.assignElement()
        this.addEvent()
    }

    createElement(){
        console.log("!234123")
        const root = document.getElementById("root");
        root.innerHTML = `
        <h1 class="mb-3">크롤링 생성하기</h1>
            <form class="d-flex justify-content-center align-items-center mb-4">
              <div class="form-outline flex-fill">
                <input type="text" id="keyword" class="form-control form-control-lg" />
              </div>
            </form>

            <ul class="list-group mb-0" id="tag-list">
            <!--tagList Here-->
            </ul>
            <div class="text-center mb-5 mt-3">
              <button type="submit" id="add-button" class="btn btn-info btn-md ms-2">동의어추가</button>
            </div>
            <div class="text-center">
              <button type="submit" id="submit-button" class="btn btn-primary btn-lg ms-2">Submit</button>
            </div>
          </div>
        `;
    }

    assignElement(){
      this.keywordEl = root.querySelector("#keyword")
      this.addButtonEl = root.querySelector("#add-button")
      this.submitButtonEl = root.querySelector("#submit-button")
      this.tagListEl = root.querySelector("#tag-list")
  }

  addEvent(){
      this.addButtonEl.addEventListener('click', this.onClickAddTag.bind(this))
      this.submitButtonEl.addEventListener('click', this.onClickSubmitChart.bind(this))
  }

  onClickAddTag(){
    const newTagEl = document.createElement("div")
    newTagEl.setAttribute("class","tag")
    newTagEl.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
    <input type="text" name="text" class="form-control border-0 form-control-md mx-2" />
    <div title="Remove item">
      <i class="fas fa-times text-primary"></i>
    </div>
  </li>
        `
    this.tagListEl.appendChild(newTagEl)
    newTagEl.querySelector('div[title="Remove item"]')
        .addEventListener('click', this.deleteButtonEvent.bind(newTagEl))
}

onClickSubmitChart(){
    if (!this.checkLength()){
        alert("글자 길이는 2이상이어야 합니다(공백제외)")
        return
    }
    console.log(this.keywordEl.value)
    const textsEl = this.tagListEl.querySelectorAll('input[name="text"]')
    const tagList = new Array().slice.call(textsEl).map(b=>b.value)
    console.log(tagList)
    // window.location.hash = '#/'
    axios.get(`${serverUrl}/make/loop`, {
        params: {
          tagList: tagList.join(","),
          keyword: this.keywordEl.value
        },
      })
      .then(response=>response.data)
      .then(data=>{
        console.log(data)
        window.location.hash = '#/'
    })

}

checkLength(){
    if (this.keywordEl.value.trim().length<2){
        return false;
    }
    const tagList = this.tagListEl.querySelectorAll('input[name="text"]')
    for (const tag of tagList){
        if (tag.value.trim().length<2){
            return false
        }
    }
    return true
}

    deleteButtonEvent(){
        this.remove()
    }

}

export default createChart;