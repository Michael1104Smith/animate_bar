function SetAbsolute(){

    var length = absolute_data.Control.length;
    var i;
    
    var absolute_control_sum = 0;
    var absolute_alchol_sum = 0;
    for(i = 0; i < length; i++){
        absolute_control_sum += absolute_data.Control[i];
        absolute_alchol_sum += absolute_data.Alchol[i];
    }

    for(i = 0; i < absolute_tick_count+1; i++){

        var x = margin_left-tick_width;
        var y = margin_top + i*rect_height/absolute_tick_count;
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
        tmp_data["str"] = (absolute_tick_count-i)*absolute_max_y/absolute_tick_count;
        tmp_data["x"] = margin_left-tick_width*2;
        tmp_data["y"] = y+3;
        tmp_data["font_size"] = "8px";
        tmp_data["color"] = "black";
        tmp_data["text_anchor"] = "end";
        Tick_Text_Data.push(tmp_data);
    }       

    Absolute_Control_Data = [];
    Absolute_Alchol_Data = [];

    var absolute_control_bar_unit = rect_height/absolute_max_y;
    var absolute_alchol_bar_unit = rect_height/absolute_max_y;
    var y_pos = rect_height - absolute_control_bar_unit*absolute_control_sum;

    for(i = 0; i < length; i++){
        var x = margin_left+distance;
        var y = margin_top + y_pos;
        var barWidth = rect_width;
        var barHeight = absolute_control_bar_unit*absolute_data.Control[i];
        y_pos += barHeight;   

        var tmp_data = {};
        tmp_data["x"] = x;
        tmp_data["y"] = y;
        tmp_data["width"] = barWidth;
        tmp_data["height"] = barHeight;
        tmp_data["color"] = fill_color[i];
        tmp_data["stroke"] = stroke_color;
        Absolute_Control_Data.push(tmp_data);
    }
    y_pos = rect_height - absolute_alchol_bar_unit*absolute_alchol_sum;

    for(i = 0; i < length; i++){
        var x = margin_left + rect_width + distance*2;
        var y = margin_top + y_pos;
        var barWidth = rect_width;
        var barHeight = absolute_alchol_bar_unit*absolute_data.Alchol[i];
        y_pos += barHeight;
          
        var tmp_data = {};
        tmp_data["x"] = x;
        tmp_data["y"] = y;
        tmp_data["width"] = barWidth;
        tmp_data["height"] = barHeight;
        tmp_data["color"] = fill_color[i];
        tmp_data["stroke"] = stroke_color;
        Absolute_Alchol_Data.push(tmp_data);
    }
}
