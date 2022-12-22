import axios from '../../node_modules/axios/dist/axios.js';
let serverUrl = 'env.serverUrl'

class Main{
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
            const buttonEl = crawlResult.querySelector("button")
            console.log(buttonEl)
            if (buttonEl!=null){
                return
            }
            axios.get(`${serverUrl}/search/history/detail/${keywordId}`)
                .then(response=>response.data)
                .then(data=>{
                    console.log(data)
                    const n = data['notFinishCnt']
                    const y = data['finishCnt']
                    console.log(y)
                    if (n===0 && y==0){
                        return
                    }
                    else if (n===0){ // 완료
                        this.activateDownload(crawlResult)
                    }
                    else{
                        console.log(y)
                        const progress = Math.round((y/(n+y)*100), -2)
                        console.log(progress)
                        crawlResult.querySelector("h2[name='ongoing']").innerHTML = "진행중.."+ progress + "%"
                    }
                })
        }
    }

    onclickDownload(){
        console.log(this)
        const keywordId = this.getAttribute("value")
        axios({
            url: `${serverUrl}/download/csv/${keywordId}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);
        
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${this.querySelector("h2").innerHTML}.csv`); //or any other extension
            document.body.appendChild(link);
            link.click();
        
            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

    activateDownload(crawlResult){
        console.log(crawlResult.querySelector("div[value='done-or-doing']"))
        const spinnerDivEl = crawlResult.querySelector("div[value='done-or-doing']")
        spinnerDivEl.innerHTML = 
        `
        <button class="btn btn-primary">다운로드</button>
        `
        const buttonEl = spinnerDivEl.querySelector("button")
        buttonEl.addEventListener('click', this.onclickDownload.bind(crawlResult))
        
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
                    <div class="my-4">
                        <div class="text-center" value="done-or-doing">
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
        axios.get(`${serverUrl}/search/history/${userId}`)
        .then(response=>{this.createListElement(response.data)})
    }
}

export default Main;