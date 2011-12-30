/**
 * jQuery 分页 jQuery('#_pages').pageindex({count:100,pagesize:10,page:1});
 */
(function($) {
	$.fn.pageindex = function(o) {
		o = $.extend({
			count : 0,// 总数
			pagesize : 1,// 每页显示数
			page : 1,// 当前页码
			show_num : 10,// 显示页码个数
			string_page : "page",//页码参数
			string_prev : "&lt;&lt;",// 上一页
			string_next : "&gt;&gt;"// 下一页
		}, o || {});

		// 跳转
		var RequestQuerystring = function(key, value, url) {
			if (arguments.length == 3) {
				pURL = url;
			} else {
				pURL = window.location.href;
			}
			var reg = new RegExp("([\?\&])(" + key + "=)([^\&]*)(\&?)", "i");
			if (reg.test(pURL)) {
				return pURL.replace(reg, "$1$2" + value + "$4");
			} else {
				return pURL + (pURL.indexOf("?") == -1 ? "?" : "&") + key + "="
						+ value;
			}
		};
		// ajax.....

		// 计算页码
		var pagelist_html = "";
		var pagecount = Math.ceil(o.count / o.pagesize);
		if (o.page == 1) {
			pagelist_html += o.string_prev + "";
		} else {
			pagelist_html += "<a href=\""
					+ RequestQuerystring(o.string_page, (o.page - 1)) + "\">"
					+ o.string_prev + "</a>";
		}
		var KanSea_num;
		for (i = 0; i < (o.show_num * 2 + 1); i++) {
			KanSea_num = o.page - o.show_num + i;
			if (KanSea_num > 0 && KanSea_num <= pagecount) {
				pagelist_html += "<a href=\""
						+ RequestQuerystring(o.string_page, KanSea_num) + "\"";
				if (KanSea_num == o.page) {
					pagelist_html += "style=\"color:#ff0000\">[" + KanSea_num
							+ "]";
				} else {
					pagelist_html += ">" + KanSea_num;
				}
				pagelist_html += "</a>";
			}
		}
		if (o.page == pagecount) {
			pagelist_html += o.string_next + "";
		} else {
			pagelist_html += "<a href=\""
					+ RequestQuerystring(o.string_page, (o.page + 1)) + "\">"
					+ o.string_next + "</a>";
		}
		// 插入页面
		$(this).html(pagelist_html);
		// 简单样式
		$("a", this).css({
			"margin-left" : "5px"
		});
		$(this).css({
			width : "auto",
			"text-align" : "center"
		});
	};
})(jQuery);