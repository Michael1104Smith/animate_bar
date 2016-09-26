function drawCharts(drawFlag){

    var i, length = relative_data.Control.length;

    if(drawFlag < 3){
        $('#tick_line').html('');
        $('#tick_text').html('');
    }
    $('#axis_chart').html('');
    $('#text_chart').html('');

//Axis

    var axis_chart = d3.select("#axis_chart");
    axis_chart.append("line")
        .style("stroke", axis_color)
        .style("stroke-width", "2px")
        .attr("x1", margin_left)
        .attr("y1", margin_top)
        .attr("x2", margin_left)
        .attr("y2", margin_top + rect_height);
    axis_chart.append("line")
        .style("stroke", axis_color)
        .style("stroke-width", "2px")
        .attr("x1", margin_left)
        .attr("y1", margin_top + rect_height)
        .attr("x2", rect_width*2 + margin_left + distance*3)
        .attr("y2", margin_top + rect_height);

// Text

    var text_chart = d3.select("#text_chart");
    text_chart.append("text")
    .text('Control')
    .attr("x",margin_left+rect_width/2+distance)
    .attr("y",margin_top + rect_height + fontSize)
    .attr("font-size",fontSize)
    .attr("text-anchor",'middle')
    .attr("font-family","sans-serif")
    .attr('font-weight',"bold");

    text_chart.append("text")
    .text('Experimental')
    .attr("x",margin_left+rect_width/2*3+distance*2)
    .attr("y",margin_top + rect_height+fontSize)
    .attr("font-size",fontSize)
    .attr("text-anchor",'middle')
    .attr("font-family","sans-serif")
    .attr('font-weight',"bold");

//Axis Tick Chart
    var tick_line = d3.select("#tick_line");
    var bars = tick_line.selectAll("rect.bar")
        .data(Tick_Line_Data);
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar");
    if(drawFlag == 3){
        bars.exit()
        .transition()
        .duration(durationTime)
        .ease("exp")
            .attr("width", 0)
            .attr("fill","white")
            .remove();
    }
    if(drawFlag == 2){
        bars.attr("x",function(d){return d["x"];})
            .attr("y",function(d){return d["y"];})
            .attr("fill",function(d){return d["color"]})
            .attr("width",function(d){return d["width"]})
            .attr("height", function(d){return d["height"]})
            .attr("stroke", function(d){return d["stroke"]});
    }else
    {
        bars.transition()
        .duration(durationTime)
        .ease("quad")
            .attr("x",function(d){return d["x"];})
            .attr("y",function(d){return d["y"];})
            .attr("fill",function(d){return d["color"]})
            .attr("width",function(d){return d["width"]})
            .attr("height", function(d){return d["height"]})
            .attr("stroke", function(d){return d["stroke"]});
    }
// Axis Text Chart
    var tick_text = d3.select("#tick_text");
    var tick_text = tick_text.selectAll("text.str")
        .data(Tick_Text_Data);
    tick_text.enter()
        .append("svg:text")
        .attr("class", "str");

    if(drawFlag == 3){
        tick_text.exit()
        .transition()
        .duration(durationTime)
        .ease("exp")
            .attr("width", 0)
            .attr("fill","white")
            .remove();
    }

    if(drawFlag == 2){
        tick_text.text(function(d){return d["str"];})
            .attr("x",function(d){return d["x"];})
            .attr("y",function(d){return d["y"];})
            .attr("fill",function(d){return d["color"]})
            .attr("font-size",function(d){return d["font_size"]})
            .attr("text-anchor",function(d){return d["text_anchor"]})
            .attr("font-family","sans-serif")
            .attr("cursor","pointer");
    }else{
        tick_text.transition()
        .duration(durationTime)
        .ease("quad")
            .text(function(d){return d["str"];})
            .attr("x",function(d){return d["x"];})
            .attr("y",function(d){return d["y"];})
            .attr("fill",function(d){return d["color"]})
            .attr("font-size",function(d){return d["font_size"]})
            .attr("text-anchor",function(d){return d["text_anchor"]})
            .attr("font-family","sans-serif")
            .attr("cursor","pointer");
    }


//Control Chart
     
    if(drawFlag != 3){
        for(i = 0; i < length; i++){
            if(drawFlag == 2){
                $("#control_chart"+(i+1)).html('');
            }
            var dt = Relative_Control_Data[i];
            if(flag == 0){
                dt = Absolute_Control_Data[i];
            }
            var control_chart = d3.select("#control_chart"+(i+1));

            if(drawFlag == 1){
                control_chart.append('rect')
                    .transition()
                    .duration(durationTime)
                    .ease("quad")
                    .attr("x",dt.x)
                    .attr("y",dt.y)
                    .attr("fill",dt.color)
                    .attr("width",dt.width)
                    .attr("height", dt.height)
                    .attr("stroke", dt.stroke);
            }else{
                control_chart.append('rect')
                    .attr("x",dt.x)
                    .attr("y",dt.y)
                    .attr("fill",dt.color)
                    .attr("width",dt.width)
                    .attr("height", dt.height)
                    .attr("stroke", dt.stroke);
            }
        }
    }else{
        for(i = 0; i < length; i++){
            $("#control_chart"+(i+1)).html('');
            var dt1 = Relative_Control_Data[i];
            var dt2 = Absolute_Control_Data[i];
            var delay_time = (length-i-1)*delayduration;
            if(flag == 1){
                dt1 = Absolute_Control_Data[i];
                dt2 = Relative_Control_Data[i];
                delay_time = i*delayduration;
            }
            var control_chart = d3.select("#control_chart"+(i+1));

            control_chart.append('rect')
                .attr("x",dt1.x)
                .attr("y",dt1.y)
                .attr("fill",dt1.color)
                .attr("width",dt1.width)
                .attr("height", dt1.height)
                .attr("stroke", dt1.stroke)
                .transition()
                .duration(durationTime)
                .delay(delay_time)
                .attr({
                    x:dt2.x,
                    y:dt2.y,
                    width:dt2.width,
                    height:dt2.height
                });
        }
    }

//Alchol Chart
    if(drawFlag != 3){
        for(i = 0; i < length; i++){
            if(drawFlag == 2){
                $("#alchol_chart"+(i+1)).html('');
            }
            var dt = Relative_Alchol_Data[i];
            if(flag == 0){
                dt = Absolute_Alchol_Data[i];
            }
            var alchol_chart = d3.select("#alchol_chart"+(i+1));

            if(drawFlag == 1){
                alchol_chart.append('rect')
                    .transition()
                    .duration(durationTime)
                    .ease("quad")
                    .attr("x",dt.x)
                    .attr("y",dt.y)
                    .attr("fill",dt.color)
                    .attr("width",dt.width)
                    .attr("height", dt.height)
                    .attr("stroke", dt.stroke);
            }else{
                alchol_chart.append('rect')
                    .attr("x",dt.x)
                    .attr("y",dt.y)
                    .attr("fill",dt.color)
                    .attr("width",dt.width)
                    .attr("height", dt.height)
                    .attr("stroke", dt.stroke);
            }
        }
    }else{
        for(i = 0; i < length; i++){
            $("#alchol_chart"+(i+1)).html('');
            var dt1 = Relative_Alchol_Data[i];
            var dt2 = Absolute_Alchol_Data[i];
            var delay_time = (length-i-1)*delayduration;
            if(flag == 1){
                dt1 = Absolute_Alchol_Data[i];
                dt2 = Relative_Alchol_Data[i];
                delay_time = i*delayduration;
            }
            var alchol_chart = d3.select("#alchol_chart"+(i+1));

            alchol_chart.append('rect')
                .attr("x",dt1.x)
                .attr("y",dt1.y)
                .attr("fill",dt1.color)
                .attr("width",dt1.width)
                .attr("height", dt1.height)
                .attr("stroke", dt1.stroke)
                .transition()
                .duration(durationTime)
                .delay(delay_time)
                .attr({
                    x:dt2.x,
                    y:dt2.y,
                    width:dt2.width,
                    height:dt2.height
                });
        }
    }
}