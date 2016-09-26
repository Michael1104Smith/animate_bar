function SetRelative(){

    var length = relative_data.Control.length;
    var i;
    
    var relative_control_sum = 0;
    var realtive_alchol_sum = 0;
    for(i = 0; i < length; i++){
        relative_control_sum += relative_data.Control[i];
        realtive_alchol_sum += relative_data.Alchol[i];
    }

    for(i = 0; i < relative_tick_count+1; i++){

        var x = margin_left-tick_width;
        var y = margin_top + i*rect_height/relative_tick_count;
        var barWidth = tick_width;
        var barHeight = 1;

        var tmp_data = {};
        tmp_data["x"] = x;
        tmp_data["y"] = y;
        tmp_data["width"] = barWidth;
        tmp_data["height"] = barHeight;
        tmp_data["color"] = axis_color;
        Tick_Line_Data.push(tmp_data);


        var tmp_data = {};
        tmp_data["str"] = (relative_tick_count-i)*relative_tick_count+"%";
        tmp_data["x"] = margin_left-tick_width*2;
        tmp_data["y"] = y+3;
        tmp_data["font_size"] = "8px";
        tmp_data["color"] = "black";
        tmp_data["text_anchor"] = "end";
        Tick_Text_Data.push(tmp_data);
    }       
    Relative_Control_Data = [];
    Relative_Alchol_Data = [];

    var relative_control_bar_unit = rect_height/relative_max_y;
    var relative_alchol_bar_unit = rect_height/relative_max_y;
    var y_pos = rect_height - relative_control_bar_unit*relative_control_sum;

    for(i = 0; i < length; i++){
        var x = margin_left+distance;
        var y = margin_top + y_pos;
        var barWidth = rect_width;
        var barHeight = relative_control_bar_unit*relative_data.Control[i];
        y_pos += barHeight;   

        var tmp_data = {};
        tmp_data["x"] = x;
        tmp_data["y"] = y;
        tmp_data["width"] = barWidth;
        tmp_data["height"] = barHeight;
        tmp_data["color"] = fill_color[i];
        tmp_data["stroke"] = stroke_color;
        Relative_Control_Data.push(tmp_data);
    }
    y_pos = rect_height - relative_alchol_bar_unit*realtive_alchol_sum;

    for(i = 0; i < length; i++){
        var x = margin_left + rect_width + distance*2;
        var y = margin_top + y_pos;
        var barWidth = rect_width;
        var barHeight = relative_alchol_bar_unit*relative_data.Alchol[i];
        y_pos += barHeight;
          
        var tmp_data = {};
        tmp_data["x"] = x;
        tmp_data["y"] = y;
        tmp_data["width"] = barWidth;
        tmp_data["height"] = barHeight;
        tmp_data["color"] = fill_color[i];
        tmp_data["stroke"] = stroke_color;
        Relative_Alchol_Data.push(tmp_data);
    }

}
