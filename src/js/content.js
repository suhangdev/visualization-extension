chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        console.log(req);
        body = $('body');
        if(req.status === 'chart') {
            $(window).scroll(function(event){
                $('a,span,div,li,td,tr').removeAttr('href');
            });
            $('a,span,div,li,td,tr').removeAttr('href');
            let data = [];
            let title = [];
            let table = [];
            let classArr = [];
            let path = [];
            let index = 0;
            let flag = '';
            let chartType = '';
            console.log('start');
            $('body').append($(`
                    <div id="follow">
                        <div class="extension follow-btn">柱状图</div>
                        <div class="extension follow-btn">堆叠图</div>
                        <div class="extension follow-btn">饼图</div>
                        <div class="extension follow-btn">时序图</div>
                    </div>`));
            $(document).click(function (e) {
                if ($(e.target).attr('id') === 'modal-bg') {
                    $('html,body').attr('id', '');
                    $('#modal').remove();
                } else if (e.target.tagName === 'CANVAS') {
                } else if ($(e.target).attr('id') === 'follow' || 
                $(e.target).attr('id') === 'colorpicker' || $(e.target).attr('class') ? 
                $(e.target).attr('class').split(' ')[0] === 'extension' : 
                false) {
                    if ($(e.target).attr('class')) {
                        if ($(e.target).attr('class').split(' ')[1] === 'follow-btn') {
                            if (chartType === e.target.innerText) {
                                $(e.target).removeClass('btn-active');
                                if (chartType === '柱状图') {
                                    $('html,body').attr('id', 'ovfHidden');
                                    data = [];
                                    title = [];
                                    console.log($(sessionStorage.getItem('Data1')))
                                    findClass($(sessionStorage.getItem('Data1'))); // get data
                                    $('body').append($(`
                                        <div id="modal">
                                            <div id="modal-bg"></div>
                                            <div id="modal-content">
                                            </div>
                                        </div>`));
                                    for (let i = 0; i < data.length; i++) { // 排序
                                        for (let j = 0; j < data.length - i; j++) {
                                            if (data[j] > data[j + 1]) {
                                                let temp1 = data[j];
                                                data[j] = data[j + 1];
                                                data[j + 1] = temp1;
                                                let temp2 = title[j];
                                                title[j] = title[j + 1];
                                                title[j + 1] = temp2;
                                            }
                                        }
                                    }
                                    let chart = echarts.init(document.getElementById('modal-content'));
                                    option = {
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'shadow'
                                            }
                                        },
                                        xAxis: {
                                            type: 'value',
                                            boundaryGap: [0, 0.01],
                                            axisLabel : {//坐标轴刻度标签的相关设置。
                                                interval:0,
                                                rotate:"45"
                                            }
                                        },
                                        yAxis: {
                                            type: 'category',
                                            data: title
                                        },
                                        grid: {
                                            containLabel: true
                                        },
                                        series: [
                                            {
                                                type: 'bar',
                                                data: data
                                            }
                                        ]
                                    };
                                    chart.setOption(option);
                                }
                                else if (chartType === '堆叠图') {
                                    // TODO
                                }
                                else if (chartType === '饼图') {
                                    // TODO
                                }
                                else if (chartType === '时序图') {
                                    // TODO
                                }
                                chartType = '';
                            } else {
                                chartType = e.target.innerText;
                                $('.follow-btn').removeClass('btn-active');
                                $(e.target).addClass('btn-active');
                                $('.follow-box').remove()
                            }
                        }
                    }
                } else {
                    if (chartType === '柱状图') {
                        $('.follow-box').remove()
                        $('#follow').append(
                            $(`
                            <div class="extension follow-box">
                                <div class="extension follow-text">${$(e.target).parent().eq($(e.target).parent().index($(e.target))).html()}</div>
                                <input class="extension" type="color" id="colorpicker" style="display: inline-block; vertical-align: middle;" value="${getColor()}">
                            </div>
                            `)
                        );
                        sessionStorage.setItem('Data1', e.target.outerHTML)
                    }
                    else if (chartType === '堆叠图') {
                        $('#follow').append(
                            $(`
                            <div class="extension follow-box">
                                <div class="extension follow-text">${e.target.innerText}</div>
                                <input class="extension" type="color" id="colorpicker" style="display: inline-block; vertical-align: middle;" value="${getColor()}">
                            </div>
                            `)
                        );
                    }
                    else if (chartType === '饼图') {
                        // TODO
                    }
                    else if (chartType === '时序图') {
                        // TODO
                    }
                }
            });
            function findClass(node) {
                if (node.attr('class')) {
                    classArr = getStandardClass(node.attr('class').split(' '));
                    for (let i = 0; i < classArr.length; i++) {
                        if ($(classArr[i]).length < $(classArr[index]).length) {
                            index = i;
                        }
                    }
                    console.log(classArr[index]); // 找到最小个数的类名
                    if (path.length > 0) {
                        let temp = $(classArr[index]);
                        for (let i = 0; i < path.length; i++) {
                            if (path[i] === 'siblings') {
                                temp = temp.siblings();
                            } else if (path[i] === 'parent') {
                                temp = temp.children();
                            }
                        }
                        buildDataArr(temp)
                    } else {
                        let temp = $(classArr[index]);
                        buildDataArr(temp)
                    }
                    path = [];
                }
                else if (node.siblings().attr('class')){
                    flag = 'siblings';
                    path.push('siblings');
                    findClass(node.siblings());
                }
                else {
                    flag = 'parent';
                    path.push('parent');
                    findClass(node.parent());
                }
            }
            function getStandardClass(arr) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = `.${arr[i]}`;
                }
                return arr
            }
            function buildDataArr(jqObj) {
                debugger
                for (let i = 0; i < jqObj.length; i++) {
                    data.push(parseFloat(jqObj[i].innerText.replace(/[^\d.]/g,'')));
                    buildTitleArr($(jqObj[i]));
                }
            }
            function buildTitleArr(jqObj) {
                if (jqObj.find('h1,h2,h3,h4,h5,h6').length > 0) {
                    title.push(jqObj.find('h1,h2,h3,h4,h5,h6').text().replace(/(^\s*)|(\s*$)/g, "").replace(/[&\|\\\*^%$#@\-]/g,"").slice(0, 20))
                } else if (jqObj.find('a').length > 0 && jqObj.find('a').attr('title')) {
                    title.push(jqObj.find('a').attr('title').replace(/(^\s*)|(\s*$)/g, "").replace(/[&\|\\\*^%$#@\-]/g,"").slice(0, 20))
                } else {
                    buildTitleArr(jqObj.parent())
                }
            }
            function getColor(){
                let colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
                let colorArray = colorValue.split(",");
                let color = "#";
                for(let i = 0; i < 6; i++){
                    color += colorArray[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        }
        if(req.status === 'cloud') {
            let dataArr = [];
            let strArr = [];
            let count = 0;
            $(window).scroll(function(event){
                $('a,div,li').removeAttr('href');
            });
            $('a,div,li').removeAttr('href');
            $(document).click(function (e) {
                strArr = [];
                dataArr = [];
                $('html,body').attr('id', 'ovfHiden');
                if ($(e.target).attr('id') === 'modal-bg') {
                    $('html,body').attr('id', '');
                    $('#modal').remove();
                } else if (e.target.tagName === 'text' || e.target.tagName === 'svg' || $(e.target).attr('id') === 'modal-content') {
                } else {
                    let str = e.target.innerText.replace(/[&\|\\\*^.,【】，!！。:“”%$#@\-]/g," ");
                    let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                    if (reg.test(str)) {
                        str.replace(/[&\|\\\*^.,【】，!！()（）。:“”%$#@\-]\d+/g,"");
                        for (let i = 0; i < str.length; i++) {
                            strArr.push(str[i])
                        }
                    } else {
                        str.replace(/[&\|\\\*^.,【】，!():"%$#@\-]\d+/g," ");
                        strArr = str.split(" ")
                    }
                    for (let i = 0; i < strArr.length; i++) {
                        count = 0;
                        for(let j = 0; j < strArr.length; j++) {
                            if (strArr[i] === strArr[j]) {
                                count++
                            }
                        }
                        dataArr.push({text: strArr[i], size: count * 30})
                    }
                    let hash = {};
                    dataArr = dataArr.reduce((cur,next) => {
                        hash[next.text] ? '' : hash[next.text] = true && cur.push(next);
                        return cur;
                    },[]); //设置cur默认类型为数组，并且初始值为空的数组
                    $('body').append($(`
                    <div id="modal">
                        <div id="modal-bg"></div>
                        <div id="modal-content" style="overflow: hidden">
                        </div>
                    </div>`));
                    let fill = d3.scale.category10();
                    let layout = d3.layout.cloud()
                        .size([800, 800])
                        .words(dataArr)
                        .padding(5)
                        .rotate(function() {
                            // return ~~(Math.random() * 2) * 90;
                            return 0;
                        })
                        .font("Impact")
                        .fontSize(function(d) { return d.size; })
                        .on("end", draw);
                    layout.start();
                    function draw(words) {
                        d3.select("#modal-content").append("svg")
                            .attr("width", layout.size()[0])
                            .attr("height", layout.size()[1])
                            .append("g")
                            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                            .selectAll("text")
                            .data(words)
                            .enter().append("text")
                            .style("font-size", function(d) { return d.size + "px"; })
                            .style("font-family", "Impact")
                            .style("fill", function(d, i) { return fill(i); })
                            .attr("text-anchor", "middle")
                            .attr("transform", function(d) {
                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                            })
                            .text(function(d) { return d.text; });
                    }
                }
            });
        }
    });