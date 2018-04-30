chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        console.log(req);
        body = $('body');
        // if(req.status){
        //     body.find("table").css({"box-shadow":"0 0 5px 1px #3AB2FF", "cursor": "pointer"});
        //     body.find("table").mouseenter(function(){
        //         event.stopPropagation();
        //         $(this).one("click", function(){
        //             event.stopPropagation();
        //             $(this).parent().attr('id', 'chart');
        //             $(this).parent().empty();
        //             $('#chart').css({'width': '100%', 'height': '1000px'});
        //             let chart = echarts.init(document.getElementById('chart'));
        //             let head = [];
        //             let data = [];
        //             let yAxis = [];
        //             let table = $(this);
        //             table.find('thead').find('th').each(function () {
        //                 head.push($(this).text());
        //             });
        //             console.log(table.find('tbody'));
        //             table.find('tbody').each(function () {
        //                 for(let i = 0; i < $(this)[0].rows.length; i++){ //遍历表格的行
        //                     for(let j = 0; j < $(this)[0].rows[i].cells.length; j++){  //遍历每行的列
        //                         if (j === 0) {
        //                             yAxis.push($(this)[0].rows[i].cells[j].innerText);
        //                         } else if (j === 1) {
        //                             data.push(parseInt($(this)[0].rows[i].cells[j].innerText))
        //                         }
        //                     }
        //                 }
        //             });
        //             console.log(yAxis);
        //             console.log(data);
        //             option = {
        //                 tooltip: {
        //                     trigger: 'axis',
        //                     axisPointer: {
        //                         type: 'shadow'
        //                     }
        //                 },
        //                 xAxis: {
        //                     type: 'value',
        //                     boundaryGap: [0, 0.01],
        //                     axisLabel : {//坐标轴刻度标签的相关设置。
        //                         interval:0,
        //                         rotate:"45"
        //                     }
        //                 },
        //                 yAxis: {
        //                     type: 'category',
        //                     data: yAxis.reverse()
        //                 },
        //                 grid: {
        //                     containLabel: true
        //                 },
        //                 series: [
        //                     {
        //                         type: 'bar',
        //                         data: data.reverse(),
        //                     }
        //                 ]
        //             };
        //             chart.setOption(option);
        //             return false;
        //         })
        //     });
        //     body.find("*").mouseout(function(){
        //         event.stopPropagation();
        //         $(this).css("box-shadow", "none");
        //     })
        // } else {
        //     $("body").find("*").unbind("mouseenter").unbind("mouseout").unbind("click");
        // }
        if(req.status) {
            $(window).scroll(function(event){
                $('a,div,li').removeAttr('href');
            });
            $('a,div,li').removeAttr('href');
            let data = [];
            let title = [];
            let classArr = [];
            let index = 0;
            let flag = '';
            $(document).click(function (e) {
                data = [];
                title = [];
                findClass($(e.target));
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
                    // console.log($(classArr[index]));
                    if (flag === 'siblings') {
                        let temp = $(classArr[index]).siblings();
                        buildDataArr(temp)
                    } else if (flag === 'parent') {
                        let temp = $(classArr[index]).children();
                        buildDataArr(temp)
                    } else {
                        let temp = $(classArr[index]);
                        buildDataArr(temp)
                    }
                    console.log(data);
                    console.log(title);
                }
                else if (node.siblings().attr('class')){
                    flag = 'siblings';
                    findClass(node.siblings());
                }
                else {
                    flag = 'parent';
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
                for (let i = 0; i < jqObj.length; i++) {
                    data.push(jqObj[i].innerText.replace(/[^\d.]/g,''));
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
        }
        // if(req.status) {
        //     let classArr = [];
        //     let index = 0;
        //     $('a,div,li').removeAttr('href');
        //     $(document).click(function (e) {
        //         findClass($(e.target));
        //     });
        //     function findClass(node) {
        //         if (node.attr('class')) {
        //             classArr = getStandardClass(node.attr('class').split(' '));
        //             for (let i = 0; i < classArr.length; i++) {
        //                 if ($(classArr[i]).length < $(classArr[index]).length) {
        //                     index = i;
        //                 }
        //             }
        //             console.log(classArr[index]); // 找到最小个数的类名
        //             console.log($(classArr[index]).text())
        //         }
        //         // else if (node.siblings().attr('class')){
        //         //     findClass(node.siblings());
        //         // }
        //         else {
        //             findClass(node.parent());
        //         }
        //     }
        //     function getStandardClass(arr) {
        //         for (let i = 0; i < arr.length; i++) {
        //             arr[i] = `.${arr[i]}`;
        //         }
        //         return arr
        //     }
        // }
        // if(req.status) {
        //     findData($('body'));
        //     function findData(node) {
        //         if (node.children().length > 0) {
        //             let arr = [];
        //             for(let i = 0; i < node.length; i++) {
        //                 if (node.attr('class')) {
        //                     arr.push(node.attr('class'))
        //                 }
        //             }
        //             console.log(arr);
        //             findData(node.children())
        //         } else {
        //             // console.log(node)
        //         }
        //     }
        // }
    });