import axios from '../../node_modules/axios/dist/axios.js';

class loginsample{
    crawlResultListEl
    createChartButtonEl

    resetElement(){
        this.createElement()
        // this.assignElement() //버튼 assign은 loadhistory후에 진행
        // this.addEvent()
        this.loadHistory()
    }

    createElement(){
        const root = document.getElementById("root");
        root.innerHTML = `
<div class="container mt-5">
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2" id="crawl-result-list">
        </section>
    </div>
        `;
        this.crawlResultListEl = root.querySelector("#crawl-result-list")
    }

    assignElement(){
        const root = document.getElementById("root");
        this.createChartButtonEl = root.querySelector("#create-chart")
        
    }

    addEvent(){
        this.createChartButtonEl.addEventListener('click', this.onclickCreateChart.bind(this))
    }

    onclickCreateChart(){
        window.location.hash = '#/create'
    }

    
    getSentimentPreStage(){
        console.log("this.loopId :"+this.loopId)
        if(window.location.hash!=='#/'){
            ("if inside")
            clearInterval(this.loopId);
        } 
        for(const crawlResult of this.crawlResultListEl.querySelectorAll("div.history")){
            const keywordId = crawlResult.getAttribute("value")
            if (keywordId==="done"){
                return
            }
            axios.get(`http://localhost:7080/search/history/detail/${keywordId}`)
                .then(response=>response.data)
                .then(data=>{
                    console.log(data)
                    const n = data['notFinishCnt']
                    const y = data['finishCnt']
                    console.log(y)
                    if (n===0 && y==0){
                        return
                    }
                    else if (n===y){
                        crawlResult.setAttribute("value","done")
                        return
                    }
                    console.log(y)
                    const progress = Math.round((y/(n+y)*100), -2)
                    console.log(progress)
                    crawlResult.querySelector("h2[name='ongoing']").innerHTML = "진행중.."+ progress + "%"
                })
        }
    }

    createListElement(historyDetailList){
        console.log(historyDetailList)
        for(const historyDetail of historyDetailList){
            const loadingEl = document.createElement("div")
            loadingEl.setAttribute("value",historyDetail['keywordId'])
            loadingEl.setAttribute("class","col history")
            loadingEl.innerHTML = `
            <article class="card">
                <div class="card-body">
                    <h2 class="card-title">${historyDetail["keyword"]}</h2>
                    ${(function keywordTagIter() {
                        var output = ""
                        for(const tag of historyDetail["keywordTagList"]){
                            output += `<p class="card-title">${tag}</p>`
                        }
                        return output
                      })()} 
                    <div value="done-or-doing" class="my-4">
                        <div class="text-center">
                            <div>
                                <p class="spinner-border text-primary"></p>
                            </div>
                            <div class="text-center">
                                <h2 class="justify-center text-secondary" name="ongoing">진행중..0%</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
                `
            this.crawlResultListEl.appendChild(loadingEl)
        }
        
        this.createChartButtonEl = document.createElement("div")
        this.createChartButtonEl.setAttribute("class","col button")
        this.createChartButtonEl.innerHTML = `
        <article class="card bg-primary">
        <div class="card-body text-center">
        <h1 class="card-title">+</h1>
        </div>
    </article>
        `
        this.crawlResultListEl.appendChild(this.createChartButtonEl)
        this.addEvent()
        this.getSentimentPreStage()
        this.loopId = setInterval(()=>this.getSentimentPreStage(),30000)
    }

    loadHistory(){
        const userId = JSON.parse(localStorage.getItem("sentimentLocal"))["userId"]
        console.log(localStorage.getItem("sentimentLocal"))
        axios.get(`http://localhost:7080/search/history/${userId}`)
        .then(response=>{this.createListElement(response.data)})
    }
}

export default loginsample;