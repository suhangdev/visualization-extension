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
            let datas = [];
            let title = [];
            let table = [];
            let classArr = [];
            let path = [];
            let index = 0;
            let flag = '';
            let chartType = '';
            let chooseNode = [];
            let curColor = [];
            let count = 0;
            let label = [];
            console.log('start');
            $('body').append($(`
                    <div id="follow">
                        <div class="extension follow-btn">开始选择</div>
                    </div>`));
            $(document).click(function (e) {
                if ($(e.target).attr('id') === 'modal-bg') {
                    $('html,body').attr('id', '');
                    $('#modal').remove();
                } else if (e.target.tagName === 'CANVAS') {
                } else if ($(e.target).attr('id') === 'follow' || $(e.target).attr('class') ?
                $(e.target).attr('class').split(' ')[0] === 'extension' : false) {
                    if ($(e.target).attr('class')) {
                        if ($(e.target).attr('class').split(' ')[1] === 'follow-btn') {
                            if (chartType === '生成图表') {
                                $(e.target).removeClass('btn-active').text('开始选择');
                                $('html,body').attr('id', 'ovfHidden');
                                datas = [];
                                title = [];
                                let legend = [];
                                let series = [];
                                let nodes = $('.colorpicker');
                                let tableOfParent = false;
                                for (let i = 0; i < chooseNode.length; i++) {
                                    count = i;
                                    curColor.push(getColor());
                                    findClass(chooseNode[i]);
                                }
                                count = 0;
                                for (let i = 0; i < chooseNode[0].parents().length; i++) {
                                    if (chooseNode[0].parents()[i].nodeName === 'TABLE' && window.location.host !== 'www.baidu.com') {
                                        tableOfParent = true
                                    }
                                }
                                for (let i = 0; i < nodes.length; i++) {
                                    curColor.push($(nodes[i]).css('background-color'))
                                }
                                if (tableOfParent) {
                                    legend = label;
                                    title = datas[0];
                                    let isNotDate = true;
                                    for (let i = 0; i < title.length; i++) {
                                        if (new Date(title[i]).getTime() > 999999999999) {
                                            isNotDate = false;
                                        }
                                    }
                                    if (isNotDate) {
                                        for (let i = 1; i < datas.length; i++) {
                                            series.push(
                                                {
                                                    name: `${label[i]}`,
                                                    type: 'bar',
                                                    stack: '总量',
                                                    itemStyle:{
                                                        normal:{
                                                            color: curColor[i]
                                                        }
                                                    },
                                                    data: datas[i]
                                                }
                                            )
                                        }
                                        option = {
                                            tooltip : {
                                                trigger: 'axis',
                                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                                }
                                            },
                                            toolbox: {
                                                feature: {
                                                    saveAsImage: {}
                                                }
                                            },
                                            legend: {
                                                data: legend
                                            },
                                            grid: {
                                                left: '3%',
                                                right: '4%',
                                                bottom: '3%',
                                                containLabel: true
                                            },
                                            xAxis:  {
                                                type: 'value',
                                                axisLabel : {//坐标轴刻度标签的相关设置。
                                                    interval:0,
                                                    rotate:"45"
                                                }
                                            },
                                            yAxis: {
                                                type: 'category',
                                                data: title
                                            },
                                            series: series
                                        };
                                    } else {
                                        for (let i = 1; i < datas.length; i++) {
                                            series.push(
                                                {
                                                    name:`${label[i]}`,
                                                    type:'line',
                                                    stack: '总量',
                                                    areaStyle: {normal: {}},
                                                    itemStyle:{
                                                        normal:{
                                                            color: curColor[i]
                                                        }
                                                    },
                                                    data: datas[i]
                                                }
                                            )
                                        }
                                        option = {
                                            tooltip : {
                                                trigger: 'axis',
                                                axisPointer: {
                                                    type: 'cross',
                                                    label: {
                                                        backgroundColor: '#6a7985'
                                                    }
                                                }
                                            },
                                            legend: {
                                                data: legend
                                            },
                                            toolbox: {
                                                feature: {
                                                    saveAsImage: {}
                                                }
                                            },
                                            grid: {
                                                left: '3%',
                                                right: '4%',
                                                bottom: '3%',
                                                containLabel: true
                                            },
                                            xAxis : [
                                                {
                                                    type : 'category',
                                                    boundaryGap : false,
                                                    data : title
                                                }
                                            ],
                                            yAxis : [
                                                {
                                                    type : 'value'
                                                }
                                            ],
                                            series : series
                                        };
                                    }
                                    $('body').append($(`
                                        <div id="modal">
                                            <div id="modal-bg"></div>
                                            <div id="modal-content"></div>
                                        </div>`));
                                    let chart = echarts.init(document.getElementById('modal-content'));
                                    chart.setOption(option);
                                    chartType = '开始选择';
                                    chooseNode = [];
                                    curColor = [];
                                    label = [];
                                    $('.follow-box').remove();
                                } else {
                                    for (let i = 0; i < datas.length; i++) {
                                        legend.push(`data${i + 1}`);
                                        series.push(
                                            {
                                                name: `data${i + 1}`,
                                                type: 'bar',
                                                stack: '总量',
                                                itemStyle:{
                                                    normal:{
                                                        color: curColor[i]
                                                    }
                                                },
                                                data: datas[i].reverse()
                                            }
                                        )
                                    }
                                    console.log(label);
                                    $('body').append($(`
                                        <div id="modal">
                                            <div id="modal-bg"></div>
                                            <div id="modal-content"></div>
                                        </div>`));
                                    let chart = echarts.init(document.getElementById('modal-content'));
                                    option = {
                                        tooltip : {
                                            trigger: 'axis',
                                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                            }
                                        },
                                        legend: {
                                            data: legend
                                        },
                                        grid: {
                                            left: '3%',
                                            right: '4%',
                                            bottom: '3%',
                                            containLabel: true
                                        },
                                        xAxis:  {
                                            type: 'value',
                                            axisLabel : {//坐标轴刻度标签的相关设置。
                                                interval:0,
                                                rotate:"45"
                                            }
                                        },
                                        yAxis: {
                                            type: 'category',
                                            data: title.reverse()
                                        },
                                        series: series
                                    };
                                    chart.setOption(option);
                                    chartType = '开始选择';
                                    chooseNode = [];
                                    curColor = [];
                                    $('.follow-box').remove();
                                }
                            } else {
                                $('.follow-btn').removeClass('btn-active').text('生成图表');
                                chartType = e.target.innerText;
                                $(e.target).addClass('btn-active');
                                $('.follow-box').remove()
                            }
                        }
                    }
                } else {
                    if (chartType === '生成图表') {
                        $('#follow').append(
                            $(`
                            <div class="extension follow-box">
                                <div class="extension follow-text">${$(e.target).html()}</div>
                            </div>
                            `)
                        );
                        chooseNode.push($(e.target));
                    }
                }
            });
            function findClass(node) {
                let tableOfParent = false;
                for (let i = 0; i < node.parents().length; i++) {
                    if (node.parents()[i].nodeName === 'TABLE') {
                        tableOfParent = true
                    }
                }
                if (tableOfParent) {
                    let temp = [];
                    if (node.parents('tbody').parent().find('thead').length === 0) {
                        findThead(node, node.parents('td').index()); // title
                        node.parents('tbody').find('tr').each(function (item) {
                            // data
                            temp.push($(this).children().eq(node.parents('td').index()).text())
                        });
                        datas.push(temp);
                    } else {
                        if (window.location.host === 'www.baidu.com') { // 黑名单
                            findNodeByClass(node)
                        } else {
                            // title
                            label.push(node.parents('tbody').parent().find('thead').find('th').eq(node.parents('td').index()).text());
                            node.parents('tbody').find('tr').each(function (item) {
                                // data
                                temp.push($(this).children().eq(node.parents('td').index()).text())
                            });
                            datas.push(temp)
                        }
                    }
                } else {
                    findNodeByClass(node)
                }
            }
            function findThead(node, length) {
                if (node.find('thead').length > 0) {
                    label.push(node.find('thead').find('th').eq(length).text())
                } else {
                    findThead(node.parent(), length)
                }
            }
            function findNodeByClass(node) {
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
                let arr = [];
                for (let i = 0; i < jqObj.length; i++) {
                    arr.push(parseFloat(jqObj[i].innerText.replace(/[^\d.]/g, '')));
                    if (count === 0) {
                        buildTitleArr($(jqObj[i]));
                    }
                }
                datas.push(arr);
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
                let colorValue = "6,7,8,9,a,b,c,d,e,f";
                let colorArray = colorValue.split(",");
                let color = "#";
                for(let i = 0; i < 6; i++){
                    color += colorArray[Math.floor(Math.random() * 10)];
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
                $('html,body').attr('id', 'ovfHidden');
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