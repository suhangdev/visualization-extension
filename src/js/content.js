chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        console.log(req);
        body = $('body');
        if(req.status){
            body.find("table").css({"box-shadow":"0 0 5px 1px #3AB2FF", "cursor": "pointer"});
            body.find("table").mouseenter(function(){
                event.stopPropagation();
                $(this).one("click", function(){
                    event.stopPropagation();
                    $(this).parent().attr('id', 'chart');
                    $(this).parent().empty();
                    $('#chart').css({'width': '100%', 'height': '1000px'});
                    let chart = echarts.init(document.getElementById('chart'));
                    let head = [];
                    let data = [];
                    let yAxis = [];
                    let table = $(this);
                    table.find('thead').find('th').each(function () {
                        head.push($(this).text());
                    });
                    console.log(table.find('tbody'));
                    table.find('tbody').each(function () {
                        for(let i = 0; i < $(this)[0].rows.length; i++){ //遍历表格的行
                            for(let j = 0; j < $(this)[0].rows[i].cells.length; j++){  //遍历每行的列
                                if (j === 0) {
                                    yAxis.push($(this)[0].rows[i].cells[j].innerText);
                                } else if (j === 1) {
                                    data.push(parseInt($(this)[0].rows[i].cells[j].innerText))
                                }
                            }
                        }
                    });
                    console.log(yAxis);
                    console.log(data);
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
                            data: yAxis.reverse()
                        },
                        grid: {
                            containLabel: true
                        },
                        series: [
                            {
                                type: 'bar',
                                data: data.reverse(),
                            }
                        ]
                    };
                    chart.setOption(option);
                    return false;
                })
            });
            body.find("*").mouseout(function(){
                event.stopPropagation();
                $(this).css("box-shadow", "none");
            })
        } else {
            $("body").find("*").unbind("mouseenter").unbind("mouseout").unbind("click");
        }
    });