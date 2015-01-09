/*!
 *
 * Copyright (c) 2013, Acid Media, Inc.
 * All rights reserved.
 *
 * Redistribution and use in any form, with or without modification,
 * are not permitted.
 *
 */
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
 //@ sourceMappingURL=jquery.min.map
 */
(function(e, t) {
	var n, r, i = typeof t, o = e.document, a = e.location, s = e.jQuery, u = e.$, l = {}, c = [], p = "1.9.1", f = c.concat, d = c.push, h = c.slice, g = c.indexOf, m = l.toString, y = l.hasOwnProperty, v = p.trim, b = function(e, t) {
		return new b.fn.init(e, t, r)
	}, x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, w = /\S+/g, T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /^[\],:{}\s]*$/, E = /(?:^|:|,)(?:\s*\[)+/g, S = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, j = /^-ms-/, D = /-([\da-z])/gi, L = function(e, t) {
		return t.toUpperCase()
	}, H = function(e) {
		(o.addEventListener || "load" === e.type || "complete" === o.readyState) && (q(), b.ready())
	}, q = function() {
		o.addEventListener ? (o.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (o.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
	};
	b.fn = b.prototype = {
		jquery : p,
		constructor : b,
		init : function(e, n, r) {
			var i, a;
			if (!e)
				return this;
			if ("string" == typeof e) {
				if ( i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n)
					return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				if (i[1]) {
					if ( n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), C.test(i[1]) && b.isPlainObject(n))
						for (i in n)b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
					return this
				}
				if ( a = o.getElementById(i[2]), a && a.parentNode) {
					if (a.id !== i[2])
						return r.find(e);
					this.length = 1, this[0] = a
				}
				return this.context = o, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), b.makeArray(e, this))
		},
		selector : "",
		length : 0,
		size : function() {
			return this.length
		},
		toArray : function() {
			return h.call(this)
		},
		get : function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack : function(e) {
			var t = b.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each : function(e, t) {
			return b.each(this, e, t)
		},
		ready : function(e) {
			return b.ready.promise().done(e), this
		},
		slice : function() {
			return this.pushStack(h.apply(this, arguments))
		},
		first : function() {
			return this.eq(0)
		},
		last : function() {
			return this.eq(-1)
		},
		eq : function(e) {
			var t = this.length, n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		map : function(e) {
			return this.pushStack(b.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end : function() {
			return this.prevObject || this.constructor(null)
		},
		push : d,
		sort : [].sort,
		splice : [].splice
	}, b.fn.init.prototype = b.fn, b.extend = b.fn.extend = function() {
		var e, n, r, i, o, a, s = arguments[0] || {}, u = 1, l = arguments.length, c = !1;
		for ("boolean" == typeof s && ( c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || b.isFunction(s) || ( s = {}), l === u && ( s = this, --u); l > u; u++)
			if (null != ( o = arguments[u]))
				for (i in o) e = s[i], r = o[i], s !== r && (c && r && (b.isPlainObject(r) || ( n = b.isArray(r))) ? ( n ? ( n = !1, a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r));
		return s
	}, b.extend({
		noConflict : function(t) {
			return e.$ === b && (e.$ = u), t && e.jQuery === b && (e.jQuery = s), b
		},
		isReady : !1,
		readyWait : 1,
		holdReady : function(e) {
			e ? b.readyWait++ : b.ready(!0)
		},
		ready : function(e) {
			if (e === !0 ? !--b.readyWait : !b.isReady) {
				if (!o.body)
					return setTimeout(b.ready);
				b.isReady = !0, e !== !0 && --b.readyWait > 0 || (n.resolveWith(o, [b]), b.fn.trigger && b(o).trigger("ready").off("ready"))
			}
		},
		isFunction : function(e) {
			return "function" === b.type(e)
		},
		isArray : Array.isArray ||
		function(e) {
			return "array" === b.type(e)
		},
		isWindow : function(e) {
			return null != e && e == e.window
		},
		isNumeric : function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type : function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
		},
		isPlainObject : function(e) {
			if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e))
				return !1;
			try {
				if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf"))
					return !1
			} catch(n) {
				return !1
			}
			var r;
			for (r in e);
			return r === t || y.call(e, r)
		},
		isEmptyObject : function(e) {
			var t;
			for (t in e)
			return !1;
			return !0
		},
		error : function(e) {
			throw Error(e)
		},
		parseHTML : function(e, t, n) {
			if (!e || "string" != typeof e)
				return null;
			"boolean" == typeof t && ( n = t, t = !1), t = t || o;
			var r = C.exec(e), i = !n && [];
			return r ? [t.createElement(r[1])] : ( r = b.buildFragment([e], t, i), i && b(i).remove(), b.merge([], r.childNodes))
		},
		parseJSON : function(n) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && ( n = b.trim(n), n && k.test(n.replace(S, "@").replace(A, "]").replace(E, ""))) ? Function("return "+n)() : (b.error("Invalid JSON: " + n), t)
		},
		parseXML : function(n) {
			var r, i;
			if (!n || "string" != typeof n)
				return null;
			try {
				e.DOMParser ? ( i = new DOMParser, r = i.parseFromString(n, "text/xml")) : ( r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
			} catch(o) {
				r = t
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n), r
		},
		noop : function() {
		},
		globalEval : function(t) {
			t && b.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase : function(e) {
			return e.replace(j, "ms-").replace(D, L)
		},
		nodeName : function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each : function(e, t, n) {
			var r, i = 0, o = e.length, a = M(e);
			if (n) {
				if (a) {
					for (; o > i; i++)
						if ( r = t.apply(e[i], n), r === !1)
							break
				} else
					for (i in e)
					if ( r = t.apply(e[i], n), r === !1)
						break
			} else if (a) {
				for (; o > i; i++)
					if ( r = t.call(e[i], i, e[i]), r === !1)
						break
			} else
				for (i in e)
				if ( r = t.call(e[i], i, e[i]), r === !1)
					break;
			return e
		},
		trim : v && !v.call("\ufeff\u00a0") ? function(e) {
			return null == e ? "" : v.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(T, "")
		},
		makeArray : function(e, t) {
			var n = t || [];
			return null != e && (M(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : d.call(n, e)), n
		},
		inArray : function(e, t, n) {
			var r;
			if (t) {
				if (g)
					return g.call(t, e, n);
				for ( r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
					if ( n in t && t[n] === e)
						return n
			}
			return -1
		},
		merge : function(e, n) {
			var r = n.length, i = e.length, o = 0;
			if ("number" == typeof r)
				for (; r > o; o++)
					e[i++] = n[o];
			else
				while (n[o] !== t)
				e[i++] = n[o++];
			return e.length = i, e
		},
		grep : function(e, t, n) {
			var r, i = [], o = 0, a = e.length;
			for ( n = !!n; a > o; o++)
				r = !!t(e[o], o), n !== r && i.push(e[o]);
			return i
		},
		map : function(e, t, n) {
			var r, i = 0, o = e.length, a = M(e), s = [];
			if (a)
				for (; o > i; i++)
					r = t(e[i], i, n), null != r && (s[s.length] = r);
			else
				for (i in e) r = t(e[i], i, n), null != r && (s[s.length] = r);
			return f.apply([], s)
		},
		guid : 1,
		proxy : function(e, n) {
			var r, i, o;
			return "string" == typeof n && ( o = e[n], n = e, e = o), b.isFunction(e) ? ( r = h.call(arguments, 2), i = function() {
				return e.apply(n || this, r.concat(h.call(arguments)))
			}, i.guid = e.guid = e.guid || b.guid++, i) : t
		},
		access : function(e, n, r, i, o, a, s) {
			var u = 0, l = e.length, c = null == r;
			if ("object" === b.type(r)) {
				o = !0;
				for (u in r)
				b.access(e, n, u, r[u], !0, a, s)
			} else if (i !== t && ( o = !0, b.isFunction(i) || ( s = !0), c && ( s ? (n.call(e, i), n = null) : ( c = n, n = function(e, t, n) {
					return c.call(b(e), n)
				})), n))
				for (; l > u; u++)
					n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
		},
		now : function() {
			return (new Date).getTime()
		}
	}), b.ready.promise = function(t) {
		if (!n)
			if ( n = b.Deferred(), "complete" === o.readyState)
				setTimeout(b.ready);
			else if (o.addEventListener)
				o.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1);
			else {
				o.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
				var r = !1;
				try {
					r = null == e.frameElement && o.documentElement
				} catch(i) {
				}
				r && r.doScroll && function a() {
					if (!b.isReady) {
						try {
							r.doScroll("left")
						} catch(e) {
							return setTimeout(a, 50)
						}
						q(), b.ready()
					}
				}()
			}
		return n.promise(t)
	}, b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		l["[object " + t + "]"] = t.toLowerCase()
	});
	function M(e) {
		var t = e.length, n = b.type(e);
		return b.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}

	r = b(o);
	var _ = {};
	function F(e) {
		var t = _[e] = {};
		return b.each(e.match(w) || [], function(e, n) {
			t[n] = !0
		}), t
	}
	b.Callbacks = function(e) {
		e = "string" == typeof e ? _[e] || F(e) : b.extend({}, e);
		var n, r, i, o, a, s, u = [], l = !e.once && [], c = function(t) {
			for ( r = e.memory && t, i = !0, a = s || 0, s = 0, o = u.length, n = !0; u && o > a; a++)
				if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
					r = !1;
					break
				}
			n = !1, u && ( l ? l.length && c(l.shift()) : r ? u = [] : p.disable())
		}, p = {
			add : function() {
				if (u) {
					var t = u.length;
					(function i(t) {
						b.each(t, function(t, n) {
							var r = b.type(n);
							"function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n)
						})
					})(arguments), n ? o = u.length : r && ( s = t, c(r))
				}
				return this
			},
			remove : function() {
				return u && b.each(arguments, function(e, t) {
					var r;
					while (( r = b.inArray(t, u, r)) > -1)u.splice(r, 1), n && (o >= r && o--, a >= r && a--)
				}), this
			},
			has : function(e) {
				return e ? b.inArray(e, u) > -1 : !(!u || !u.length)
			},
			empty : function() {
				return u = [], this
			},
			disable : function() {
				return u = l = r = t, this
			},
			disabled : function() {
				return !u
			},
			lock : function() {
				return l = t, r || p.disable(), this
			},
			locked : function() {
				return !l
			},
			fireWith : function(e, t) {
				return t = t || [], t = [e, t.slice ? t.slice() : t], !u || i && !l || ( n ? l.push(t) : c(t)), this
			},
			fire : function() {
				return p.fireWith(this, arguments), this
			},
			fired : function() {
				return !!i
			}
		};
		return p
	}, b.extend({
		Deferred : function(e) {
			var t = [["resolve", "done", b.Callbacks("once memory"), "resolved"], ["reject", "fail", b.Callbacks("once memory"), "rejected"], ["notify", "progress", b.Callbacks("memory")]], n = "pending", r = {
				state : function() {
					return n
				},
				always : function() {
					return i.done(arguments).fail(arguments), this
				},
				then : function() {
					var e = arguments;
					return b.Deferred(function(n) {
						b.each(t, function(t, o) {
							var a = o[0], s = b.isFunction(e[t]) && e[t];
							i[o[1]](function() {
								var e = s && s.apply(this, arguments);
								e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a+"With"](this === r ? n.promise() : this, s ? [e] : arguments)
							})
						}), e = null
					}).promise()
				},
				promise : function(e) {
					return null != e ? b.extend(e, r) : r
				}
			}, i = {};
			return r.pipe = r.then, b.each(t, function(e, o) {
				var a = o[2], s = o[3];
				r[o[1]] = a.add, s && a.add(function() {
					n = s
				}, t[1^e][2].disable, t[2][2].lock), i[o[0]] = function() {
					return i[o[0]+"With"](this === i ? r : this, arguments), this
				}, i[o[0] + "With"] = a.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when : function(e) {
			var t = 0, n = h.call(arguments), r = n.length, i = 1 !== r || e && b.isFunction(e.promise) ? r : 0, o = 1 === i ? e : b.Deferred(), a = function(e, t, n) {
				return function(r) {
					t[e] = this, n[e] = arguments.length > 1 ? h.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
				}
			}, s, u, l;
			if (r > 1)
				for ( s = Array(r), u = Array(r), l = Array(r); r > t; t++)
					n[t] && b.isFunction(n[t].promise) ? n[t].promise().done(a(t, l, n)).fail(o.reject).progress(a(t, u, s)) : --i;
			return i || o.resolveWith(l, n), o.promise()
		}
	}), b.support = function() {
		var t, n, r, a, s, u, l, c, p, f, d = o.createElement("div");
		if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*"), r = d.getElementsByTagName("a")[0], !n || !r || !n.length)
			return {};
		s = o.createElement("select"), l = s.appendChild(o.createElement("option")), a = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
			getSetAttribute : "t" !== d.className,
			leadingWhitespace : 3 === d.firstChild.nodeType,
			tbody : !d.getElementsByTagName("tbody").length,
			htmlSerialize : !!d.getElementsByTagName("link").length,
			style : /top/.test(r.getAttribute("style")),
			hrefNormalized : "/a" === r.getAttribute("href"),
			opacity : /^0.5/.test(r.style.opacity),
			cssFloat : !!r.style.cssFloat,
			checkOn : !!a.value,
			optSelected : l.selected,
			enctype : !!o.createElement("form").enctype,
			html5Clone : "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML,
			boxModel : "CSS1Compat" === o.compatMode,
			deleteExpando : !0,
			noCloneEvent : !0,
			inlineBlockNeedsLayout : !1,
			shrinkWrapBlocks : !1,
			reliableMarginRight : !0,
			boxSizingReliable : !0,
			pixelPosition : !1
		}, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !l.disabled;
		try {
			delete d.test
		} catch(h) {
			t.deleteExpando = !1
		}
		a = o.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), u = o.createDocumentFragment(), u.appendChild(a), t.appendChecked = a.checked, t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), d.cloneNode(!0).click());
		for (f in {
			submit : !0,
			change : !0,
			focusin : !0
		})d.setAttribute( c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
		return d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip, b(function() {
			var n, r, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", u = o.getElementsByTagName("body")[0];
			u && ( n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", u.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
				width : "4px"
			}).width, r = d.appendChild(o.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (u.style.zoom = 1)), u.removeChild(n), n = d = a = r = null)
		}), n = s = u = l = r = a = null, t
	}();
	var O = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, B = /([A-Z])/g;
	function P(e, n, r, i) {
		if (b.acceptData(e)) {
			var o, a, s = b.expando, u = "string" == typeof n, l = e.nodeType, p = l ? b.cache : e, f = l ? e[s] : e[s] && s;
			if (f && p[f] && (i || p[f].data) || !u || r !== t)
				return f || ( l ? e[s] = f = c.pop() || b.guid++ : f = s), p[f] || (p[f] = {}, l || (p[f].toJSON = b.noop)), ("object" == typeof n || "function" == typeof n) && ( i ? p[f] = b.extend(p[f], n) : p[f].data = b.extend(p[f].data, n)), o = p[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[b.camelCase(n)] = r), u ? ( a = o[n], null == a && ( a = o[b.camelCase(n)])) : a = o, a
		}
	}

	function R(e, t, n) {
		if (b.acceptData(e)) {
			var r, i, o, a = e.nodeType, s = a ? b.cache : e, u = a ? e[b.expando] : b.expando;
			if (s[u]) {
				if (t && ( o = n ? s[u] : s[u].data)) {
					b.isArray(t) ? t = t.concat(b.map(t, b.camelCase)) : t in o ? t = [t] : ( t = b.camelCase(t), t = t in o ? [t] : t.split(" "));
					for ( r = 0, i = t.length; i > r; r++)
						delete o[t[r]];
					if (!( n ? $ : b.isEmptyObject)(o))
						return
				}
				(n || (
				delete s[u].data, $(s[u]))) && ( a ? b.cleanData([e], !0) : b.support.deleteExpando || s != s.window ?
				delete s[u] : s[u] = null)
			}
		}
	}
	b.extend({
		cache : {},
		expando : "jQuery" + (p + Math.random()).replace(/\D/g, ""),
		noData : {
			embed : !0,
			object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet : !0
		},
		hasData : function(e) {
			return e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando], !!e && !$(e)
		},
		data : function(e, t, n) {
			return P(e, t, n)
		},
		removeData : function(e, t) {
			return R(e, t)
		},
		_data : function(e, t, n) {
			return P(e, t, n, !0)
		},
		_removeData : function(e, t) {
			return R(e, t, !0)
		},
		acceptData : function(e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)
				return !1;
			var t = e.nodeName && b.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), b.fn.extend({
		data : function(e, n) {
			var r, i, o = this[0], a = 0, s = null;
			if (e === t) {
				if (this.length && ( s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) {
					for ( r = o.attributes; r.length > a; a++)
						i = r[a].name, i.indexOf("data-") || ( i = b.camelCase(i.slice(5)), W(o, i, s[i]));
					b._data(o, "parsedAttrs", !0)
				}
				return s
			}
			return "object" == typeof e ? this.each(function() {
				b.data(this, e)
			}) : b.access(this, function(n) {
				return n === t ? o ? W(o, e, b.data(o, e)) : null : (this.each(function() {
					b.data(this, e, n)
				}), t)
			}, null, n, arguments.length > 1, null, !0)
		},
		removeData : function(e) {
			return this.each(function() {
				b.removeData(this, e)
			})
		}
	});
	function W(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(B, "-$1").toLowerCase();
			if ( r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : O.test(r) ? b.parseJSON(r) : r
				} catch(o) {
				}
				b.data(e, n, r)
			} else
				r = t
		}
		return r
	}

	function $(e) {
		var t;
		for (t in e)
		if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t)
			return !1;
		return !0
	}
	b.extend({
		queue : function(e, n, r) {
			var i;
			return e ? ( n = (n || "fx") + "queue", i = b._data(e, n), r && (!i || b.isArray(r) ? i = b._data(e, n, b.makeArray(r)) : i.push(r)), i || []) : t
		},
		dequeue : function(e, t) {
			t = t || "fx";
			var n = b.queue(e, t), r = n.length, i = n.shift(), o = b._queueHooks(e, t), a = function() {
				b.dequeue(e, t)
			};
			"inprogress" === i && ( i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"),
			delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
		},
		_queueHooks : function(e, t) {
			var n = t + "queueHooks";
			return b._data(e, n) || b._data(e, n, {
				empty : b.Callbacks("once memory").add(function() {
					b._removeData(e, t + "queue"), b._removeData(e, n)
				})
			})
		}
	}), b.fn.extend({
		queue : function(e, n) {
			var r = 2;
			return "string" != typeof e && ( n = e, e = "fx", r--), r > arguments.length ? b.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = b.queue(this, e, n);
				b._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && b.dequeue(this, e)
			})
		},
		dequeue : function(e) {
			return this.each(function() {
				b.dequeue(this, e)
			})
		},
		delay : function(e, t) {
			return e = b.fx ? b.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue : function(e) {
			return this.queue(e || "fx", [])
		},
		promise : function(e, n) {
			var r, i = 1, o = b.Deferred(), a = this, s = this.length, u = function() {
				--i || o.resolveWith(a, [a])
			};
			"string" != typeof e && ( n = e, e = t), e = e || "fx";
			while (s--) r = b._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
			return u(), o.promise(n)
		}
	});
	var I, z, X = /[\t\r\n]/g, U = /\r/g, V = /^(?:input|select|textarea|button|object)$/i, Y = /^(?:a|area)$/i, J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, G = /^(?:checked|selected)$/i, Q = b.support.getSetAttribute, K = b.support.input;
	b.fn.extend({
		attr : function(e, t) {
			return b.access(this, b.attr, e, t, arguments.length > 1)
		},
		removeAttr : function(e) {
			return this.each(function() {
				b.removeAttr(this, e)
			})
		},
		prop : function(e, t) {
			return b.access(this, b.prop, e, t, arguments.length > 1)
		},
		removeProp : function(e) {
			return e = b.propFix[e] || e, this.each(function() {
				try {
					this[e] = t,
					delete this[e]
				} catch(n) {
				}
			})
		},
		addClass : function(e) {
			var t, n, r, i, o, a = 0, s = this.length, u = "string" == typeof e && e;
			if (b.isFunction(e))
				return this.each(function(t) {
					b(this).addClass(e.call(this, t, this.className))
				});
			if (u)
				for ( t = (e || "").match(w) || []; s > a; a++)
					if ( n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : " ")) {
						o = 0;
						while ( i = t[o++])0 > r.indexOf(" " + i + " ") && (r += i + " ");
						n.className = b.trim(r)
					}
			return this
		},
		removeClass : function(e) {
			var t, n, r, i, o, a = 0, s = this.length, u = 0 === arguments.length || "string" == typeof e && e;
			if (b.isFunction(e))
				return this.each(function(t) {
					b(this).removeClass(e.call(this, t, this.className))
				});
			if (u)
				for ( t = (e || "").match(w) || []; s > a; a++)
					if ( n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : "")) {
						o = 0;
						while ( i = t[o++])
						while (r.indexOf(" " + i + " ") >= 0)
						r = r.replace(" " + i + " ", " ");
						n.className = e ? b.trim(r) : ""
					}
			return this
		},
		toggleClass : function(e, t) {
			var n = typeof e, r = "boolean" == typeof t;
			return b.isFunction(e) ? this.each(function(n) {
				b(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n) {
					var o, a = 0, s = b(this), u = t, l = e.match(w) || [];
					while ( o = l[a++]) u = r ? u : !s.hasClass(o), s[u?"addClass":"removeClass"](o)
				} else
					(n === i || "boolean" === n) && (this.className && b._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : b._data(this, "__className__") || "")
			})
		},
		hasClass : function(e) {
			var t = " " + e + " ", n = 0, r = this.length;
			for (; r > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(X, " ").indexOf(t) >= 0)
					return !0;
			return !1
		},
		val : function(e) {
			var n, r, i, o = this[0];
			{
				if (arguments.length)
					return i = b.isFunction(e), this.each(function(n) {
						var o, a = b(this);
						1 === this.nodeType && ( o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && ( o = b.map(o, function(e) {
							return null == e ? "" : e + ""
						})), r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
					});
				if (o)
					return r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()], r && "get" in r && ( n = r.get(o, "value")) !== t ? n : ( n = o.value, "string" == typeof n ? n.replace(U, "") : null == n ? "" : n)
			}
		}
	}), b.extend({
		valHooks : {
			option : {
				get : function(e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select : {
				get : function(e) {
					var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0;
					for (; s > u; u++)
						if ( n = r[u], !(!n.selected && u !== i || (b.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && b.nodeName(n.parentNode, "optgroup"))) {
							if ( t = b(n).val(), o)
								return t;
							a.push(t)
						}
					return a
				},
				set : function(e, t) {
					var n = b.makeArray(t);
					return b(e).find("option").each(function() {
						this.selected = b.inArray(b(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attr : function(e, n, r) {
			var o, a, s, u = e.nodeType;
			if (e && 3 !== u && 8 !== u && 2 !== u)
				return typeof e.getAttribute === i ? b.prop(e, n, r) : ( a = 1 !== u || !b.isXMLDoc(e), a && ( n = n.toLowerCase(), o = b.attrHooks[n] || (J.test(n) ? z : I)), r === t ? o && a && "get" in o && null !== ( s = o.get(e, n)) ? s : ( typeof e.getAttribute !== i && ( s = e.getAttribute(n)), null == s ? t : s) : null !== r ? o && a && "set" in o && ( s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : (b.removeAttr(e, n), t))
		},
		removeAttr : function(e, t) {
			var n, r, i = 0, o = t && t.match(w);
			if (o && 1 === e.nodeType)
				while ( n = o[i++]) r = b.propFix[n] || n, J.test(n) ? !Q && G.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""), e.removeAttribute( Q ? n : r)
		},
		attrHooks : {
			type : {
				set : function(e, t) {
					if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix : {
			tabindex : "tabIndex",
			readonly : "readOnly",
			"for" : "htmlFor",
			"class" : "className",
			maxlength : "maxLength",
			cellspacing : "cellSpacing",
			cellpadding : "cellPadding",
			rowspan : "rowSpan",
			colspan : "colSpan",
			usemap : "useMap",
			frameborder : "frameBorder",
			contenteditable : "contentEditable"
		},
		prop : function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s)
				return a = 1 !== s || !b.isXMLDoc(e), a && ( n = b.propFix[n] || n, o = b.propHooks[n]), r !== t ? o && "set" in o && ( i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== ( i = o.get(e, n)) ? i : e[n]
		},
		propHooks : {
			tabIndex : {
				get : function(e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), z = {
		get : function(e, n) {
			var r = b.prop(e, n), i = "boolean" == typeof r && e.getAttribute(n), o = "boolean" == typeof r ? K && Q ? null != i : G.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
			return o && o.value !== !1 ? n.toLowerCase() : t
		},
		set : function(e, t, n) {
			return t === !1 ? b.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, K && Q || (b.attrHooks.value = {
		get : function(e, n) {
			var r = e.getAttributeNode(n);
			return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
		},
		set : function(e, n, r) {
			return b.nodeName(e, "input") ? (e.defaultValue = n, t) : I && I.set(e, n, r)
		}
	}), Q || ( I = b.valHooks.button = {
		get : function(e, n) {
			var r = e.getAttributeNode(n);
			return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
		},
		set : function(e, n, r) {
			var i = e.getAttributeNode(r);
			return i || e.setAttributeNode( i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
		}
	}, b.attrHooks.contenteditable = {
		get : I.get,
		set : function(e, t, n) {
			I.set(e, "" === t ? !1 : t, n)
		}
	}, b.each(["width", "height"], function(e, n) {
		b.attrHooks[n] = b.extend(b.attrHooks[n], {
			set : function(e, r) {
				return "" === r ? (e.setAttribute(n, "auto"), r) : t
			}
		})
	})), b.support.hrefNormalized || (b.each(["href", "src", "width", "height"], function(e, n) {
		b.attrHooks[n] = b.extend(b.attrHooks[n], {
			get : function(e) {
				var r = e.getAttribute(n, 2);
				return null == r ? t : r
			}
		})
	}), b.each(["href", "src"], function(e, t) {
		b.propHooks[t] = {
			get : function(e) {
				return e.getAttribute(t, 4)
			}
		}
	})), b.support.style || (b.attrHooks.style = {
		get : function(e) {
			return e.style.cssText || t
		},
		set : function(e, t) {
			return e.style.cssText = t + ""
		}
	}), b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, {
		get : function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), b.support.enctype || (b.propFix.enctype = "encoding"), b.support.checkOn || b.each(["radio", "checkbox"], function() {
		b.valHooks[this] = {
			get : function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), b.each(["radio", "checkbox"], function() {
		b.valHooks[this] = b.extend(b.valHooks[this], {
			set : function(e, n) {
				return b.isArray(n) ? e.checked = b.inArray(b(e).val(), n) >= 0 : t
			}
		})
	});
	var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/;
	function it() {
		return !0
	}

	function ot() {
		return !1
	}
	b.event = {
		global : {},
		add : function(e, n, r, o, a) {
			var s, u, l, c, p, f, d, h, g, m, y, v = b._data(e);
			if (v) {
				r.handler && ( c = r, r = c.handler, a = c.selector), r.guid || (r.guid = b.guid++), ( u = v.events) || ( u = v.events = {}), ( f = v.handle) || ( f = v.handle = function(e) {
					return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(f.elem, arguments)
				}, f.elem = e), n = (n || "").match(w) || [""], l = n.length;
				while (l--) s = rt.exec(n[l]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), p = b.event.special[g] || {}, g = ( a ? p.delegateType : p.bindType) || g, p = b.event.special[g] || {}, d = b.extend({
					type : g,
					origType : y,
					data : o,
					handler : r,
					guid : r.guid,
					selector : a,
					needsContext : a && b.expr.match.needsContext.test(a),
					namespace : m.join(".")
				}, c), ( h = u[g]) || ( h = u[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), b.event.global[g] = !0;
				e = null
			}
		},
		remove : function(e, t, n, r, i) {
			var o, a, s, u, l, c, p, f, d, h, g, m = b.hasData(e) && b._data(e);
			if (m && ( c = m.events)) {
				t = (t || "").match(w) || [""], l = t.length;
				while (l--)
				if ( s = rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
					p = b.event.special[d] || {}, d = ( r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length;
					while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
					u && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || b.removeEvent(e, d, m.handle),
					delete c[d])
				} else
					for (d in c)
					b.event.remove(e, d + t[l], n, r, !0);
				b.isEmptyObject(c) && (
				delete m.handle, b._removeData(e, "events"))
			}
		},
		trigger : function(n, r, i, a) {
			var s, u, l, c, p, f, d, h = [i || o], g = y.call(n, "type") ? n.type : n, m = y.call(n, "namespace") ? n.namespace.split(".") : [];
			if ( l = f = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && ( m = g.split("."), g = m.shift(), m.sort()), u = 0 > g.indexOf(":") && "on" + g, n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : b.makeArray(r, [n]), p = b.event.special[g] || {}, a || !p.trigger || p.trigger.apply(i, r) !== !1)) {
				if (!a && !p.noBubble && !b.isWindow(i)) {
					for ( c = p.delegateType || g, nt.test(c + g) || ( l = l.parentNode); l; l = l.parentNode)
						h.push(l), f = l;
					f === (i.ownerDocument || o) && h.push(f.defaultView || f.parentWindow || e)
				}
				d = 0;
				while (( l = h[d++]) && !n.isPropagationStopped())n.type = d > 1 ? c : p.bindType || g, s = (b._data(l,"events")||{})[n.type] && b._data(l, "handle"), s && s.apply(l, r), s = u && l[u], s && b.acceptData(l) && s.apply && s.apply(l, r) === !1 && n.preventDefault();
				if (n.type = g, !(a || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === g && b.nodeName(i, "a") || !b.acceptData(i) || !u || !i[g] || b.isWindow(i))) {
					f = i[u], f && (i[u] = null), b.event.triggered = g;
					try {
						i[g]()
					} catch(v) {
					}
					b.event.triggered = t, f && (i[u] = f)
				}
				return n.result
			}
		},
		dispatch : function(e) {
			e = b.event.fix(e);
			var n, r, i, o, a, s = [], u = h.call(arguments), l = (b._data(this,"events")||{})[e.type] || [], c = b.event.special[e.type] || {};
			if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				s = b.event.handlers.call(this, e, l), n = 0;
				while (( o = s[n++]) && !e.isPropagationStopped()) {
					e.currentTarget = o.elem, a = 0;
					while (( i = o.handlers[a++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
				}
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers : function(e, n) {
			var r, i, o, a, s = [], u = n.delegateCount, l = e.target;
			if (u && l.nodeType && (!e.button || "click" !== e.type))
				for (; l != this; l = l.parentNode || this)
					if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
						for ( o = [], a = 0; u > a; a++)
							i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? b(r, this).index(l) >= 0 : b.find(r, this, null, [l]).length), o[r] && o.push(i);
						o.length && s.push({
							elem : l,
							handlers : o
						})
					}
			return n.length > u && s.push({
				elem : this,
				handlers : n.slice(u)
			}), s
		},
		fix : function(e) {
			if (e[b.expando])
				return e;
			var t, n, r, i = e.type, a = e, s = this.fixHooks[i];
			s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new b.Event(a), t = r.length;
			while (t--) n = r[t], e[n] = a[n];
			return e.target || (e.target = a.srcElement || o), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e
		},
		props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks : {},
		keyHooks : {
			props : "char charCode key keyCode".split(" "),
			filter : function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks : {
			props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter : function(e, n) {
				var r, i, a, s = n.button, u = n.fromElement;
				return null == e.pageX && null != n.clientX && ( i = e.target.ownerDocument || o, a = i.documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), !e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
			}
		},
		special : {
			load : {
				noBubble : !0
			},
			click : {
				trigger : function() {
					return b.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
				}
			},
			focus : {
				trigger : function() {
					if (this !== o.activeElement && this.focus)
						try {
							return this.focus(), !1
						} catch(e) {
						}
				},
				delegateType : "focusin"
			},
			blur : {
				trigger : function() {
					return this === o.activeElement && this.blur ? (this.blur(), !1) : t
				},
				delegateType : "focusout"
			},
			beforeunload : {
				postDispatch : function(e) {
					e.result !== t && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate : function(e, t, n, r) {
			var i = b.extend(new b.Event, n, {
				type : e,
				isSimulated : !0,
				originalEvent : {}
			});
			r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, b.removeEvent = o.removeEventListener ? function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var r = "on" + t;
		e.detachEvent && ( typeof e[r] === i && (e[r] = null), e.detachEvent(r, n))
	}, b.Event = function(e, n) {
		return this instanceof b.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && b.extend(this, n), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0, t) : new b.Event(e, n)
	}, b.Event.prototype = {
		isDefaultPrevented : ot,
		isPropagationStopped : ot,
		isImmediatePropagationStopped : ot,
		preventDefault : function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation : function() {
			var e = this.originalEvent;
			this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation : function() {
			this.isImmediatePropagationStopped = it, this.stopPropagation()
		}
	}, b.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function(e, t) {
		b.event.special[e] = {
			delegateType : t,
			bindType : t,
			handle : function(e) {
				var n, r = this, i = e.relatedTarget, o = e.handleObj;
				return (!i || i !== r && !b.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), b.support.submitBubbles || (b.event.special.submit = {
		setup : function() {
			return b.nodeName(this, "form") ? !1 : (b.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target, r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t;
				r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), b._data(r, "submitBubbles", !0))
			}), t)
		},
		postDispatch : function(e) {
			e._submit_bubble && (
			delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown : function() {
			return b.nodeName(this, "form") ? !1 : (b.event.remove(this, "._submit"), t)
		}
	}), b.support.changeBubbles || (b.event.special.change = {
		setup : function() {
			return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (b.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), b.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), b.event.simulate("change", this, e, !0)
			})), !1) : (b.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				Z.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0)
				}), b._data(t, "changeBubbles", !0))
			}), t)
		},
		handle : function(e) {
			var n = e.target;
			return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
		},
		teardown : function() {
			return b.event.remove(this, "._change"), !Z.test(this.nodeName)
		}
	}), b.support.focusinBubbles || b.each({
		focus : "focusin",
		blur : "focusout"
	}, function(e, t) {
		var n = 0, r = function(e) {
			b.event.simulate(t, e.target, b.event.fix(e), !0)
		};
		b.event.special[t] = {
			setup : function() {
				0 === n++ && o.addEventListener(e, r, !0)
			},
			teardown : function() {
				0 === --n && o.removeEventListener(e, r, !0)
			}
		}
	}), b.fn.extend({
		on : function(e, n, r, i, o) {
			var a, s;
			if ("object" == typeof e) {
				"string" != typeof n && ( r = r || n, n = t);
				for (a in e)
				this.on(a, n, r, e[a], o);
				return this
			}
			if (null == r && null == i ? ( i = n, r = n = t) : null == i && ("string" == typeof n ? ( i = r, r = t) : ( i = r, r = n, n = t)), i === !1)
				i = ot;
			else if (!i)
				return this;
			return 1 === o && ( s = i, i = function(e) {
				return b().off(e), s.apply(this, arguments)
			}, i.guid = s.guid || (s.guid = b.guid++)), this.each(function() {
				b.event.add(this, e, i, r, n)
			})
		},
		one : function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off : function(e, n, r) {
			var i, o;
			if (e && e.preventDefault && e.handleObj)
				return i = e.handleObj, b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (o in e)
				this.off(o, n, e[o]);
				return this
			}
			return (n === !1 || "function" == typeof n) && ( r = n, n = t), r === !1 && ( r = ot), this.each(function() {
				b.event.remove(this, e, r, n)
			})
		},
		bind : function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind : function(e, t) {
			return this.off(e, null, t)
		},
		delegate : function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate : function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		trigger : function(e, t) {
			return this.each(function() {
				b.event.trigger(e, t, this)
			})
		},
		triggerHandler : function(e, n) {
			var r = this[0];
			return r ? b.event.trigger(e, n, r, !0) : t
		}
	}), function(e, t) {
		var n, r, i, o, a, s, u, l, c, p, f, d, h, g, m, y, v, x = "sizzle" + -new Date, w = e.document, T = {}, N = 0, C = 0, k = it(), E = it(), S = it(), A = typeof t, j = 1 << 31, D = [], L = D.pop, H = D.push, q = D.slice, M = D.indexOf ||
		function(e) {
			var t = 0, n = this.length;
			for (; n > t; t++)
				if (this[t] === e)
					return t;
			return -1
		}, _ = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = F.replace("w", "w#"), B = "([*^$|!~]?=)", P = "\\[" + _ + "*(" + F + ")" + _ + "*(?:" + B + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + _ + "*\\]", R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + P.replace(3, 8) + ")*)|.*)\\)|)", W = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"), $ = RegExp("^" + _ + "*," + _ + "*"), I = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"), z = RegExp(R), X = RegExp("^" + O + "$"), U = {
			ID : RegExp("^#(" + F + ")"),
			CLASS : RegExp("^\\.(" + F + ")"),
			NAME : RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"),
			TAG : RegExp("^(" + F.replace("w", "w*") + ")"),
			ATTR : RegExp("^" + P),
			PSEUDO : RegExp("^" + R),
			CHILD : RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"),
			needsContext : RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")
		}, V = /[\x20\t\r\n\f]*[+~]/, Y = /^[^{]+\{\s*\[native code/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, G = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, K = /'|\\/g, Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, tt = function(e, t) {
			var n = "0x" + t - 65536;
			return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
		};
		try {
			q.call(w.documentElement.childNodes,0)[0].nodeType
		} catch(nt) {
			q = function(e) {
				var t, n = [];
				while ( t = this[e++])
				n.push(t);
				return n
			}
		}
		function rt(e) {
			return Y.test(e + "")
		}

		function it() {
			var e, t = [];
			return e = function(n, r) {
				return t.push(n += " ") > i.cacheLength &&
				delete e[t.shift()], e[n] = r
			}
		}

		function ot(e) {
			return e[x] = !0, e
		}

		function at(e) {
			var t = p.createElement("div");
			try {
				return e(t)
			} catch(n) {
				return !1
			} finally {
				t = null
			}
		}

		function st(e, t, n, r) {
			var i, o, a, s, u, l, f, g, m, v;
			if (( t ? t.ownerDocument || t : w) !== p && c(t), t = t || p, n = n || [], !e || "string" != typeof e)
				return n;
			if (1 !== ( s = t.nodeType) && 9 !== s)
				return [];
			if (!d && !r) {
				if ( i = J.exec(e))
					if ( a = i[1]) {
						if (9 === s) {
							if ( o = t.getElementById(a), !o || !o.parentNode)
								return n;
							if (o.id === a)
								return n.push(o), n
						} else if (t.ownerDocument && ( o = t.ownerDocument.getElementById(a)) && y(t, o) && o.id === a)
							return n.push(o), n
					} else {
						if (i[2])
							return H.apply(n, q.call(t.getElementsByTagName(e), 0)), n;
						if (( a = i[3]) && T.getByClassName && t.getElementsByClassName)
							return H.apply(n, q.call(t.getElementsByClassName(a), 0)), n
					}
				if (T.qsa && !h.test(e)) {
					if ( f = !0, g = x, m = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
						l = ft(e), ( f = t.getAttribute("id")) ? g = f.replace(K, "\\$&") : t.setAttribute("id", g), g = "[id='" + g + "'] ", u = l.length;
						while (u--)
						l[u] = g + dt(l[u]);
						m = V.test(e) && t.parentNode || t, v = l.join(",")
					}
					if (v)
						try {
							return H.apply(n, q.call(m.querySelectorAll(v), 0)), n
						} catch(b) {
						} finally {
							f || t.removeAttribute("id")
						}
				}
			}
			return wt(e.replace(W, "$1"), t, n, r)
		}
		a = st.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, c = st.setDocument = function(e) {
			var n = e ? e.ownerDocument || e : w;
			return n !== p && 9 === n.nodeType && n.documentElement ? ( p = n, f = n.documentElement, d = a(n), T.tagNameNoComments = at(function(e) {
				return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
			}), T.attributes = at(function(e) {
				e.innerHTML = "<select></select>";
				var t = typeof e.lastChild.getAttribute("multiple");
				return "boolean" !== t && "string" !== t
			}), T.getByClassName = at(function(e) {
				return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
			}), T.getByName = at(function(e) {
				e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", f.insertBefore(e, f.firstChild);
				var t = n.getElementsByName && n.getElementsByName(x).length === 2 + n.getElementsByName(x + 0).length;
				return T.getIdNotName = !n.getElementById(x), f.removeChild(e), t
			}), i.attrHandle = at(function(e) {
				return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href")
			}) ? {} : {
				href : function(e) {
					return e.getAttribute("href", 2)
				},
				type : function(e) {
					return e.getAttribute("type")
				}
			}, T.getIdNotName ? (i.find.ID = function(e, t) {
				if ( typeof t.getElementById !== A && !d) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, i.filter.ID = function(e) {
				var t = e.replace(et, tt);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (i.find.ID = function(e, n) {
				if ( typeof n.getElementById !== A && !d) {
					var r = n.getElementById(e);
					return r ? r.id === e || typeof r.getAttributeNode !== A && r.getAttributeNode("id").value === e ? [r] : t : []
				}
			}, i.filter.ID = function(e) {
				var t = e.replace(et, tt);
				return function(e) {
					var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), i.find.TAG = T.tagNameNoComments ? function(e, n) {
				return typeof n.getElementsByTagName !== A ? n.getElementsByTagName(e) : t
			} : function(e, t) {
				var n, r = [], i = 0, o = t.getElementsByTagName(e);
				if ("*" === e) {
					while ( n = o[i++])1 === n.nodeType && r.push(n);
					return r
				}
				return o
			}, i.find.NAME = T.getByName &&
			function(e, n) {
				return typeof n.getElementsByName !== A ? n.getElementsByName(name) : t
			}, i.find.CLASS = T.getByClassName &&
			function(e, n) {
				return typeof n.getElementsByClassName === A || d ? t : n.getElementsByClassName(e)
			}, g = [], h = [":focus"], (T.qsa = rt(n.querySelectorAll)) && (at(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || h.push(":checked")
			}), at(function(e) {
				e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + _ + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:")
			})), (T.matchesSelector = rt( m = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function(e) {
				T.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", R)
			}), h = RegExp(h.join("|")), g = RegExp(g.join("|")), y = rt(f.contains) || f.compareDocumentPosition ? function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
				return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
			} : function(e, t) {
				if (t)
					while ( t = t.parentNode)
					if (t === e)
						return !0;
				return !1
			}, v = f.compareDocumentPosition ? function(e, t) {
				var r;
				return e === t ? ( u = !0, 0) : ( r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === n || y(w, e) ? -1 : t === n || y(w, t) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
			} : function(e, t) {
				var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t];
				if (e === t)
					return u = !0, 0;
				if (!o || !a)
					return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : 0;
				if (o === a)
					return ut(e, t);
				r = e;
				while ( r = r.parentNode)
				s.unshift(r);
				r = t;
				while ( r = r.parentNode)
				l.unshift(r);
				while (s[i] === l[i])
				i++;
				return i ? ut(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0
			}, u = !1, [0, 0].sort(v), T.detectDuplicates = u, p) : p
		}, st.matches = function(e, t) {
			return st(e, null, null, t)
		}, st.matchesSelector = function(e, t) {
			if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Z, "='$1']"), !(!T.matchesSelector || d || g && g.test(t) || h.test(t)))
				try {
					var n = m.call(e, t);
					if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType)
						return n
				} catch(r) {
				}
			return st(t, p, null, [e]).length > 0
		}, st.contains = function(e, t) {
			return (e.ownerDocument || e) !== p && c(e), y(e, t)
		}, st.attr = function(e, t) {
			var n;
			return (e.ownerDocument || e) !== p && c(e), d || ( t = t.toLowerCase()), ( n = i.attrHandle[t]) ? n(e) : d || T.attributes ? e.getAttribute(t) : (( n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
		}, st.error = function(e) {
			throw Error("Syntax error, unrecognized expression: " + e)
		}, st.uniqueSort = function(e) {
			var t, n = [], r = 1, i = 0;
			if ( u = !T.detectDuplicates, e.sort(v), u) {
				for (; t = e[r]; r++)
					t === e[r - 1] && ( i = n.push(r));
				while (i--)
				e.splice(n[i], 1)
			}
			return e
		};
		function ut(e, t) {
			var n = t && e, r = n && (~t.sourceIndex || j) - (~e.sourceIndex || j);
			if (r)
				return r;
			if (n)
				while ( n = n.nextSibling)
				if (n === t)
					return -1;
			return e ? 1 : -1
		}

		function lt(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}

		function ct(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}

		function pt(e) {
			return ot(function(t) {
				return t = +t, ot(function(n, r) {
					var i, o = e([], n.length, t), a = o.length;
					while (a--)
					n[ i = o[a]] && (n[i] = !(r[i] = n[i]))
				})
			})
		}
		o = st.getText = function(e) {
			var t, n = "", r = 0, i = e.nodeType;
			if (i) {
				if (1 === i || 9 === i || 11 === i) {
					if ("string" == typeof e.textContent)
						return e.textContent;
					for ( e = e.firstChild; e; e = e.nextSibling)
						n += o(e)
				} else if (3 === i || 4 === i)
					return e.nodeValue
			} else
				for (; t = e[r]; r++)
					n += o(t);
			return n
		}, i = st.selectors = {
			cacheLength : 50,
			createPseudo : ot,
			match : U,
			find : {},
			relative : {
				">" : {
					dir : "parentNode",
					first : !0
				},
				" " : {
					dir : "parentNode"
				},
				"+" : {
					dir : "previousSibling",
					first : !0
				},
				"~" : {
					dir : "previousSibling"
				}
			},
			preFilter : {
				ATTR : function(e) {
					return e[1] = e[1].replace(et, tt), e[3] = (e[4] || e[5] || "").replace(et, tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD : function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]), e
				},
				PSEUDO : function(e) {
					var t, n = !e[5] && e[2];
					return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && z.test(n) && ( t = ft(n, !0)) && ( t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
				}
			},
			filter : {
				TAG : function(e) {
					return "*" === e ? function() {
						return !0
					} : ( e = e.replace(et, tt).toLowerCase(),
					function(t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					})

				},
				CLASS : function(e) {
					var t = k[e + " "];
					return t || ( t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && k(e, function(e) {
						return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "")
					})
				},
				ATTR : function(e, t, n) {
					return function(r) {
						var i = st.attr(r, e);
						return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
					}
				},
				CHILD : function(e, t, n, r, i) {
					var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
					return 1 === r && 0 === i ? function(e) {
						return !!e.parentNode
					} : function(t, n, u) {
						var l, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s;
						if (m) {
							if (o) {
								while (g) {
									p = t;
									while ( p = p[g])
									if ( s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType)
										return !1;
									h = g = "only" === e && !h && "nextSibling"
								}
								return !0
							}
							if ( h = [ a ? m.firstChild : m.lastChild], a && v) {
								c = m[x] || (m[x] = {}), l = c[e] || [], d = l[0] === N && l[1], f = l[0] === N && l[2], p = d && m.childNodes[d];
								while ( p = ++d && p && p[g] || ( f = d = 0) || h.pop())
								if (1 === p.nodeType && ++f && p === t) {
									c[e] = [N, d, f];
									break
								}
							} else if (v && ( l = (t[x]||(t[x]={}))[e]) && l[0] === N)
								f = l[1];
							else
								while ( p = ++d && p && p[g] || ( f = d = 0) || h.pop())
								if (( s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[x]||(p[x]={}))[e] = [N, f]), p === t))
									break;
							return f -= i, f === r || 0 === f % r && f / r >= 0
						}
					}
				},
				PSEUDO : function(e, t) {
					var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
					return r[x] ? r(t) : r.length > 1 ? ( n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function(e, n) {
						var i, o = r(e, t), a = o.length;
						while (a--) i = M.call(e, o[a]), e[i] = !(n[i] = o[a])
					}) : function(e) {
						return r(e, 0, n)
					}) : r
				}
			},
			pseudos : {
				not : ot(function(e) {
					var t = [], n = [], r = s(e.replace(W, "$1"));
					return r[x] ? ot(function(e, t, n, i) {
						var o, a = r(e, null, i, []), s = e.length;
						while (s--)( o = a[s]) && (e[s] = !(t[s] = o))
					}) : function(e, i, o) {
						return t[0] = e, r(t, null, o, n), !n.pop()
					}
				}),
				has : ot(function(e) {
					return function(t) {
						return st(e, t).length > 0
					}
				}),
				contains : ot(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
					}
				}),
				lang : ot(function(e) {
					return X.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(et, tt).toLowerCase(),
					function(t) {
						var n;
						do
							if ( n = d ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang)
								return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
						while((t=t.parentNode)&&1===t.nodeType);
						return !1
					}

				}),
				target : function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root : function(e) {
					return e === f
				},
				focus : function(e) {
					return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				enabled : function(e) {
					return e.disabled === !1
				},
				disabled : function(e) {
					return e.disabled === !0
				},
				checked : function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !!e.checked || "option" === t && !!e.selected
				},
				selected : function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty : function(e) {
					for ( e = e.firstChild; e; e = e.nextSibling)
						if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)
							return !1;
					return !0
				},
				parent : function(e) {
					return !i.pseudos.empty(e)
				},
				header : function(e) {
					return Q.test(e.nodeName)
				},
				input : function(e) {
					return G.test(e.nodeName)
				},
				button : function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text : function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == ( t = e.getAttribute("type")) || t.toLowerCase() === e.type)
				},
				first : pt(function() {
					return [0]
				}),
				last : pt(function(e, t) {
					return [t - 1]
				}),
				eq : pt(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even : pt(function(e, t) {
					var n = 0;
					for (; t > n; n += 2)
						e.push(n);
					return e
				}),
				odd : pt(function(e, t) {
					var n = 1;
					for (; t > n; n += 2)
						e.push(n);
					return e
				}),
				lt : pt(function(e, t, n) {
					var r = 0 > n ? n + t : n;
					for (; --r >= 0; )
						e.push(r);
					return e
				}),
				gt : pt(function(e, t, n) {
					var r = 0 > n ? n + t : n;
					for (; t > ++r; )
						e.push(r);
					return e
				})
			}
		};
		for (n in {
			radio : !0,
			checkbox : !0,
			file : !0,
			password : !0,
			image : !0
		})
		i.pseudos[n] = lt(n);
		for (n in {
			submit : !0,
			reset : !0
		})
		i.pseudos[n] = ct(n);
		function ft(e, t) {
			var n, r, o, a, s, u, l, c = E[e + " "];
			if (c)
				return t ? 0 : c.slice(0);
			s = e, u = [], l = i.preFilter;
			while (s) {
				(!n || ( r = $.exec(s))) && (r && ( s = s.slice(r[0].length) || s), u.push( o = [])), n = !1, ( r = I.exec(s)) && ( n = r.shift(), o.push({
					value : n,
					type : r[0].replace(W, " ")
				}), s = s.slice(n.length));
				for (a in i.filter)!( r = U[a].exec(s)) || l[a] && !( r = l[a](r)) || ( n = r.shift(), o.push({
					value : n,
					type : a,
					matches : r
				}), s = s.slice(n.length));
				if (!n)
					break
			}
			return t ? s.length : s ? st.error(e) : E(e, u).slice(0)
		}

		function dt(e) {
			var t = 0, n = e.length, r = "";
			for (; n > t; t++)
				r += e[t].value;
			return r
		}

		function ht(e, t, n) {
			var i = t.dir, o = n && "parentNode" === i, a = C++;
			return t.first ? function(t, n, r) {
				while ( t = t[i])
				if (1 === t.nodeType || o)
					return e(t, n, r)
			} : function(t, n, s) {
				var u, l, c, p = N + " " + a;
				if (s) {
					while ( t = t[i])
					if ((1 === t.nodeType || o) && e(t, n, s))
						return !0
				} else
					while ( t = t[i])
					if (1 === t.nodeType || o)
						if ( c = t[x] || (t[x] = {}), ( l = c[i]) && l[0] === p) {
							if (( u = l[1]) === !0 || u === r)
								return u === !0
						} else if ( l = c[i] = [p], l[1] = e(t, n, s) || r, l[1] === !0)
							return !0
			}
		}

		function gt(e) {
			return e.length > 1 ? function(t, n, r) {
				var i = e.length;
				while (i--)
				if (!e[i](t, n, r))
					return !1;
				return !0
			} : e[0]
		}

		function mt(e, t, n, r, i) {
			var o, a = [], s = 0, u = e.length, l = null != t;
			for (; u > s; s++)
				( o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
			return a
		}

		function yt(e, t, n, r, i, o) {
			return r && !r[x] && ( r = yt(r)), i && !i[x] && ( i = yt(i, o)), ot(function(o, a, s, u) {
				var l, c, p, f = [], d = [], h = a.length, g = o || xt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : mt(g, f, e, s, u), y = n ? i || ( o ? e : h || r) ? [] : a : m;
				if (n && n(m, y, s, u), r) {
					l = mt(y, d), r(l, [], s, u), c = l.length;
					while (c--)( p = l[c]) && (y[d[c]] = !(m[d[c]] = p))
				}
				if (o) {
					if (i || e) {
						if (i) {
							l = [], c = y.length;
							while (c--)( p = y[c]) && l.push(m[c] = p);
							i(null, y = [], l, u)
						}
						c = y.length;
						while (c--)( p = y[c]) && ( l = i ? M.call(o, p) : f[c]) > -1 && (o[l] = !(a[l] = p))
					}
				} else
					y = mt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : H.apply(a, y)
			})
		}

		function vt(e) {
			var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], u = a ? 1 : 0, c = ht(function(e) {
				return e === t
			}, s, !0), p = ht(function(e) {
				return M.call(t, e) > -1
			}, s, !0), f = [
			function(e, n, r) {
				return !a && (r || n !== l) || (( t = n).nodeType ? c(e, n, r) : p(e, n, r))
			}];
			for (; o > u; u++)
				if ( n = i.relative[e[u].type])
					f = [ht(gt(f), n)];
				else {
					if ( n = i.filter[e[u].type].apply(null, e[u].matches), n[x]) {
						for ( r = ++u; o > r; r++)
							if (i.relative[e[r].type])
								break;
						return yt(u > 1 && gt(f), u > 1 && dt(e.slice(0, u - 1)).replace(W, "$1"), n, r > u && vt(e.slice(u, r)), o > r && vt( e = e.slice(r)), o > r && dt(e))
					}
					f.push(n)
				}
			return gt(f)
		}

		function bt(e, t) {
			var n = 0, o = t.length > 0, a = e.length > 0, s = function(s, u, c, f, d) {
				var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, T = l, C = s || a && i.find.TAG("*", d && u.parentNode || u), k = N += null == T ? 1 : Math.random() || .1;
				for (w && ( l = u !== p && u, r = n); null != ( h = C[b]); b++) {
					if (a && h) {
						g = 0;
						while ( m = e[g++])
						if (m(h, u, c)) {
							f.push(h);
							break
						}
						w && ( N = k, r = ++n)
					}
					o && (( h = !m && h) && v--, s && x.push(h))
				}
				if (v += b, o && b !== v) {
					g = 0;
					while ( m = t[g++])m(x, y, u, c);
					if (s) {
						if (v > 0)
							while (b--)x[b] || y[b] || (y[b] = L.call(f));
						y = mt(y)
					}
					H.apply(f, y), w && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(f)
				}
				return w && ( N = k, l = T), x
			};
			return o ? ot(s) : s
		}

		s = st.compile = function(e, t) {
			var n, r = [], i = [], o = S[e + " "];
			if (!o) {
				t || ( t = ft(e)), n = t.length;
				while (n--) o = vt(t[n]), o[x] ? r.push(o) : i.push(o);
				o = S(e, bt(i, r))
			}
			return o
		};
		function xt(e, t, n) {
			var r = 0, i = t.length;
			for (; i > r; r++)
				st(e, t[r], n);
			return n
		}

		function wt(e, t, n, r) {
			var o, a, u, l, c, p = ft(e);
			if (!r && 1 === p.length) {
				if ( a = p[0] = p[0].slice(0), a.length > 2 && "ID" === ( u = a[0]).type && 9 === t.nodeType && !d && i.relative[a[1].type]) {
					if ( t = i.find.ID(u.matches[0].replace(et,tt),t)[0], !t)
						return n;
					e = e.slice(a.shift().value.length)
				}
				o = U.needsContext.test(e) ? 0 : a.length;
				while (o--) {
					if ( u = a[o], i.relative[ l = u.type])
						break;
					if (( c = i.find[l]) && ( r = c(u.matches[0].replace(et, tt), V.test(a[0].type) && t.parentNode || t))) {
						if (a.splice(o, 1), e = r.length && dt(a), !e)
							return H.apply(n, q.call(r, 0)), n;
						break
					}
				}
			}
			return s(e,p)(r, t, d, n, V.test(e)), n
		}
		i.pseudos.nth = i.pseudos.eq;
		function Tt() {
		}
		i.filters = Tt.prototype = i.pseudos, i.setFilters = new Tt, c(), st.attr = b.attr, b.find = st, b.expr = st.selectors, b.expr[":"] = b.expr.pseudos, b.unique = st.uniqueSort, b.text = st.getText, b.isXMLDoc = st.isXML, b.contains = st.contains
	}(e);
	var at = /Until$/, st = /^(?:parents|prev(?:Until|All))/, ut = /^.[^:#\[\.,]*$/, lt = b.expr.match.needsContext, ct = {
		children : !0,
		contents : !0,
		next : !0,
		prev : !0
	};
	b.fn.extend({
		find : function(e) {
			var t, n, r, i = this.length;
			if ("string" != typeof e)
				return r = this, this.pushStack(b(e).filter(function() {
					for ( t = 0; i > t; t++)
						if (b.contains(r[t], this))
							return !0
				}));
			for ( n = [], t = 0; i > t; t++)
				b.find(e, this[t], n);
			return n = this.pushStack(i > 1 ? b.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
		},
		has : function(e) {
			var t, n = b(e, this), r = n.length;
			return this.filter(function() {
				for ( t = 0; r > t; t++)
					if (b.contains(this, n[t]))
						return !0
			})
		},
		not : function(e) {
			return this.pushStack(ft(this, e, !1))
		},
		filter : function(e) {
			return this.pushStack(ft(this, e, !0))
		},
		is : function(e) {
			return !!e && ("string" == typeof e ? lt.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest : function(e, t) {
			var n, r = 0, i = this.length, o = [], a = lt.test(e) || "string" != typeof e ? b(e, t || this.context) : 0;
			for (; i > r; r++) {
				n = this[r];
				while (n && n.ownerDocument && n !== t && 11 !== n.nodeType) {
					if ( a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) {
						o.push(n);
						break
					}
					n = n.parentNode
				}
			}
			return this.pushStack(o.length > 1 ? b.unique(o) : o)
		},
		index : function(e) {
			return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add : function(e, t) {
			var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [e] : e), r = b.merge(this.get(), n);
			return this.pushStack(b.unique(r))
		},
		addBack : function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), b.fn.andSelf = b.fn.addBack;
	function pt(e, t) {
		do
			e = e[t];
		while(e&&1!==e.nodeType);
		return e
	}
	b.each({
		parent : function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents : function(e) {
			return b.dir(e, "parentNode")
		},
		parentsUntil : function(e, t, n) {
			return b.dir(e, "parentNode", n)
		},
		next : function(e) {
			return pt(e, "nextSibling")
		},
		prev : function(e) {
			return pt(e, "previousSibling")
		},
		nextAll : function(e) {
			return b.dir(e, "nextSibling")
		},
		prevAll : function(e) {
			return b.dir(e, "previousSibling")
		},
		nextUntil : function(e, t, n) {
			return b.dir(e, "nextSibling", n)
		},
		prevUntil : function(e, t, n) {
			return b.dir(e, "previousSibling", n)
		},
		siblings : function(e) {
			return b.sibling((e.parentNode || {}).firstChild, e)
		},
		children : function(e) {
			return b.sibling(e.firstChild)
		},
		contents : function(e) {
			return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes)
		}
	}, function(e, t) {
		b.fn[e] = function(n, r) {
			var i = b.map(this, t, n);
			return at.test(e) || ( r = n), r && "string" == typeof r && ( i = b.filter(r, i)), i = this.length > 1 && !ct[e] ? b.unique(i) : i, this.length > 1 && st.test(e) && ( i = i.reverse()), this.pushStack(i)
		}
	}), b.extend({
		filter : function(e, t, n) {
			return n && ( e = ":not(" + e + ")"), 1 === t.length ? b.find.matchesSelector(t[0], e) ? [t[0]] : [] : b.find.matches(e, t)
		},
		dir : function(e, n, r) {
			var i = [], o = e[n];
			while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r)))1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		sibling : function(e, t) {
			var n = [];
			for (; e; e = e.nextSibling)
				1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	function ft(e, t, n) {
		if ( t = t || 0, b.isFunction(t))
			return b.grep(e, function(e, r) {
				var i = !!t.call(e, r, e);
				return i === n
			});
		if (t.nodeType)
			return b.grep(e, function(e) {
				return e === t === n
			});
		if ("string" == typeof t) {
			var r = b.grep(e, function(e) {
				return 1 === e.nodeType
			});
			if (ut.test(t))
				return b.filter(t, r, !n);
			t = b.filter(t, r)
		}
		return b.grep(e, function(e) {
			return b.inArray(e, t) >= 0 === n
		})
	}

	function dt(e) {
		var t = ht.split("|"), n = e.createDocumentFragment();
		if (n.createElement)
			while (t.length)
			n.createElement(t.pop());
		return n
	}

	var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Nt = /^(?:checkbox|radio)$/i, Ct = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = {
		option : [1, "<select multiple='multiple'>", "</select>"],
		legend : [1, "<fieldset>", "</fieldset>"],
		area : [1, "<map>", "</map>"],
		param : [1, "<object>", "</object>"],
		thead : [1, "<table>", "</table>"],
		tr : [2, "<table><tbody>", "</tbody></table>"],
		col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default : b.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	}, jt = dt(o), Dt = jt.appendChild(o.createElement("div"));
	At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, b.fn.extend({
		text : function(e) {
			return b.access(this, function(e) {
				return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll : function(e) {
			if (b.isFunction(e))
				return this.each(function(t) {
					b(this).wrapAll(e.call(this, t))
				});
			if (this[0]) {
				var t = b(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					var e = this;
					while (e.firstChild && 1 === e.firstChild.nodeType)
					e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner : function(e) {
			return b.isFunction(e) ? this.each(function(t) {
				b(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = b(this), n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap : function(e) {
			var t = b.isFunction(e);
			return this.each(function(n) {
				b(this).wrapAll( t ? e.call(this, n) : e)
			})
		},
		unwrap : function() {
			return this.parent().each(function() {
				b.nodeName(this, "body") || b(this).replaceWith(this.childNodes)
			}).end()
		},
		append : function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
			})
		},
		prepend : function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
			})
		},
		before : function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after : function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove : function(e, t) {
			var n, r = 0;
			for (; null != ( n = this[r]); r++)
				(!e || b.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(Ot(n)), n.parentNode && (t && b.contains(n.ownerDocument, n) && Mt(Ot(n, "script")), n.parentNode.removeChild(n)));
			return this
		},
		empty : function() {
			var e, t = 0;
			for (; null != ( e = this[t]); t++) {
				1 === e.nodeType && b.cleanData(Ot(e, !1));
				while (e.firstChild)
				e.removeChild(e.firstChild);
				e.options && b.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone : function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return b.clone(this, e, t)
			})
		},
		html : function(e) {
			return b.access(this, function(e) {
				var n = this[0] || {}, r = 0, i = this.length;
				if (e === t)
					return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
				if (!("string" != typeof e || Tt.test(e) || !b.support.htmlSerialize && mt.test(e) || !b.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e)||["",""])[1].toLowerCase()])) {
					e = e.replace(vt, "<$1></$2>");
					try {
						for (; i > r; r++)
							n = this[r] || {}, 1 === n.nodeType && (b.cleanData(Ot(n, !1)), n.innerHTML = e);
						n = 0
					} catch(o) {
					}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith : function(e) {
			var t = b.isFunction(e);
			return t || "string" == typeof e || ( e = b(e).not(this).detach()), this.domManip([e], !0, function(e) {
				var t = this.nextSibling, n = this.parentNode;
				n && (b(this).remove(), n.insertBefore(e, t))
			})
		},
		detach : function(e) {
			return this.remove(e, !0)
		},
		domManip : function(e, n, r) {
			e = f.apply([], e);
			var i, o, a, s, u, l, c = 0, p = this.length, d = this, h = p - 1, g = e[0], m = b.isFunction(g);
			if (m || !(1 >= p || "string" != typeof g || b.support.checkClone) && Ct.test(g))
				return this.each(function(i) {
					var o = d.eq(i);
					m && (e[0] = g.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
				});
			if (p && ( l = b.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && ( l = i), i)) {
				for ( n = n && b.nodeName(i, "tr"), s = b.map(Ot(l, "script"), Ht), a = s.length; p > c; c++)
					o = l, c !== h && ( o = b.clone(o, !0, !0), a && b.merge(s, Ot(o, "script"))), r.call(n && b.nodeName(this[c], "table") ? Lt(this[c], "tbody") : this[c], o, c);
				if (a)
					for ( u = s[s.length - 1].ownerDocument, b.map(s, qt), c = 0; a > c; c++)
						o = s[c], kt.test(o.type || "") && !b._data(o, "globalEval") && b.contains(u, o) && (o.src ? b.ajax({
							url : o.src,
							type : "GET",
							dataType : "script",
							async : !1,
							global : !1,
							"throws" : !0
						}) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(St, "")));
				l = i = null
			}
			return this
		}
	});
	function Lt(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}

	function Ht(e) {
		var t = e.getAttributeNode("type");
		return e.type = (t && t.specified) + "/" + e.type, e
	}

	function qt(e) {
		var t = Et.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function Mt(e, t) {
		var n, r = 0;
		for (; null != ( n = e[r]); r++)
			b._data(n, "globalEval", !t || b._data(t[r], "globalEval"))
	}

	function _t(e, t) {
		if (1 === t.nodeType && b.hasData(e)) {
			var n, r, i, o = b._data(e), a = b._data(t, o), s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s)
				for ( r = 0, i = s[n].length; i > r; r++)
					b.event.add(t, n, s[n][r])
			}
			a.data && (a.data = b.extend({}, a.data))
		}
	}

	function Ft(e, t) {
		var n, r, i;
		if (1 === t.nodeType) {
			if ( n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) {
				i = b._data(t);
				for (r in i.events)
				b.removeEvent(t, r, i.handle);
				t.removeAttribute(b.expando)
			}
			"script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}
	b.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function(e, t) {
		b.fn[e] = function(e) {
			var n, r = 0, i = [], o = b(e), a = o.length - 1;
			for (; a >= r; r++)
				n = r === a ? this : this.clone(!0), b(o[r])[t](n), d.apply(i, n.get());
			return this.pushStack(i)
		}
	});
	function Ot(e, n) {
		var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
		if (!s)
			for ( s = [], r = e.childNodes || e; null != ( o = r[a]); a++)
				!n || b.nodeName(o, n) ? s.push(o) : b.merge(s, Ot(o, n));
		return n === t || n && b.nodeName(e, n) ? b.merge([e], s) : s
	}

	function Bt(e) {
		Nt.test(e.type) && (e.defaultChecked = e.checked)
	}
	b.extend({
		clone : function(e, t, n) {
			var r, i, o, a, s, u = b.contains(e.ownerDocument, e);
			if (b.support.html5Clone || b.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild( o = Dt.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e)))
				for ( r = Ot(o), s = Ot(e), a = 0; null != ( i = s[a]); ++a)
					r[a] && Ft(i, r[a]);
			if (t)
				if (n)
					for ( s = s || Ot(e), r = r || Ot(o), a = 0; null != ( i = s[a]); a++)
						_t(i, r[a]);
				else
					_t(e, o);
			return r = Ot(o, "script"), r.length > 0 && Mt(r, !u && Ot(e, "script")), r = s = i = null, o
		},
		buildFragment : function(e, t, n, r) {
			var i, o, a, s, u, l, c, p = e.length, f = dt(t), d = [], h = 0;
			for (; p > h; h++)
				if ( o = e[h], o || 0 === o)
					if ("object" === b.type(o))
						b.merge(d, o.nodeType ? [o] : o);
					else if (wt.test(o)) {
						s = s || f.appendChild(t.createElement("div")), u = (bt.exec(o)||["",""])[1].toLowerCase(), c = At[u] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0];
						while (i--)
						s = s.lastChild;
						if (!b.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !b.support.tbody) {
							o = "table" !== u || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length;
							while (i--)b.nodeName( l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l)
						}
						b.merge(d, s.childNodes), s.textContent = "";
						while (s.firstChild)
						s.removeChild(s.firstChild);
						s = f.lastChild
					} else
						d.push(t.createTextNode(o));
			s && f.removeChild(s), b.support.appendChecked || b.grep(Ot(d, "input"), Bt), h = 0;
			while ( o = d[h++])
			if ((!r || -1 === b.inArray(o, r)) && ( a = b.contains(o.ownerDocument, o), s = Ot(f.appendChild(o), "script"), a && Mt(s), n)) {
				i = 0;
				while ( o = s[i++])kt.test(o.type || "") && n.push(o)
			}
			return s = null, f
		},
		cleanData : function(e, t) {
			var n, r, o, a, s = 0, u = b.expando, l = b.cache, p = b.support.deleteExpando, f = b.event.special;
			for (; null != ( n = e[s]); s++)
				if ((t || b.acceptData(n)) && ( o = n[u], a = o && l[o])) {
					if (a.events)
						for (r in a.events)
						f[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle);
					l[o] && (
					delete l[o], p ?
					delete n[u] : typeof n.removeAttribute !== i ? n.removeAttribute(u) : n[u] = null, c.push(o))
				}
		}
	});
	var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + x + ")(.*)$", "i"), Yt = RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + x + ")", "i"), Gt = {
		BODY : "block"
	}, Qt = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	}, Kt = {
		letterSpacing : 0,
		fontWeight : 400
	}, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"];
	function tn(e, t) {
		if ( t in e)
			return t;
		var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length;
		while (i--)
		if ( t = en[i] + n, t in e)
			return t;
		return r
	}

	function nn(e, t) {
		return e = t || e, "none" === b.css(e, "display") || !b.contains(e.ownerDocument, e)
	}

	function rn(e, t) {
		var n, r, i, o = [], a = 0, s = e.length;
		for (; s > a; a++)
			r = e[a], r.style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = b._data(r, "olddisplay", un(r.nodeName)))) : o[a] || ( i = nn(r), (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display"))));
		for ( a = 0; s > a; a++)
			r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
		return e
	}
	b.fn.extend({
		css : function(e, n) {
			return b.access(this, function(e, n, r) {
				var i, o, a = {}, s = 0;
				if (b.isArray(n)) {
					for ( o = Rt(e), i = n.length; i > s; s++)
						a[n[s]] = b.css(e, n[s], !1, o);
					return a
				}
				return r !== t ? b.style(e, n, r) : b.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show : function() {
			return rn(this, !0)
		},
		hide : function() {
			return rn(this)
		},
		toggle : function(e) {
			var t = "boolean" == typeof e;
			return this.each(function() {
				( t ? e : nn(this)) ? b(this).show() : b(this).hide()
			})
		}
	}), b.extend({
		cssHooks : {
			opacity : {
				get : function(e, t) {
					if (t) {
						var n = Wt(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber : {
			columnCount : !0,
			fillOpacity : !0,
			fontWeight : !0,
			lineHeight : !0,
			opacity : !0,
			orphans : !0,
			widows : !0,
			zIndex : !0,
			zoom : !0
		},
		cssProps : {
			"float" : b.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style : function(e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, u = b.camelCase(n), l = e.style;
				if ( n = b.cssProps[u] || (b.cssProps[u] = tn(l, u)), s = b.cssHooks[n] || b.cssHooks[u], r === t)
					return s && "get" in s && ( o = s.get(e, !1, i)) !== t ? o : l[n];
				if ( a = typeof r, "string" === a && ( o = Jt.exec(r)) && ( r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[u] || (r += "px"), b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && ( r = s.set(e, r, i)) === t)))
					try {
						l[n] = r
					} catch(c) {
					}
			}
		},
		css : function(e, n, r, i) {
			var o, a, s, u = b.camelCase(n);
			return n = b.cssProps[u] || (b.cssProps[u] = tn(e.style, u)), s = b.cssHooks[n] || b.cssHooks[u], s && "get" in s && ( a = s.get(e, !0, r)), a === t && ( a = Wt(e, n, i)), "normal" === a && n in Kt && ( a = Kt[n]), "" === r || r ? ( o = parseFloat(a), r === !0 || b.isNumeric(o) ? o || 0 : a) : a
		},
		swap : function(e, t, n, r) {
			var i, o, a = {};
			for (o in t)a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for (o in t)
			e.style[o] = a[o];
			return i
		}
	}), e.getComputedStyle ? ( Rt = function(t) {
		return e.getComputedStyle(t, null)
	}, Wt = function(e, n, r) {
		var i, o, a, s = r || Rt(e), u = s ? s.getPropertyValue(n) || s[n] : t, l = e.style;
		return s && ("" !== u || b.contains(e.ownerDocument, e) || ( u = b.style(e, n)), Yt.test(u) && Ut.test(n) && ( i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
	}) : o.documentElement.currentStyle && ( Rt = function(e) {
		return e.currentStyle
	}, Wt = function(e, n, r) {
		var i, o, a, s = r || Rt(e), u = s ? s[n] : t, l = e.style;
		return null == u && l && l[n] && ( u = l[n]), Yt.test(u) && !zt.test(n) && ( i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
	});
	function on(e, t, n) {
		var r = Vt.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function an(e, t, n, r, i) {
		var o = n === ( r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0;
		for (; 4 > o; o += 2)
			"margin" === n && (a += b.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= b.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= b.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += b.css(e, "border" + Zt[o] + "Width", !0, i)));
		return a
	}

	function sn(e, t, n) {
		var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o);
		if (0 >= i || null == i) {
			if ( i = Wt(e, t, o), (0 > i || null == i) && ( i = e.style[t]), Yt.test(i))
				return i;
			r = a && (b.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + an(e, t, n || ( a ? "border" : "content"), r, o) + "px"
	}

	function un(e) {
		var t = o, n = Gt[e];
		return n || ( n = ln(e, t), "none" !== n && n || ( Pt = (Pt || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = ln(e, t), Pt.detach()), Gt[e] = n), n
	}

	function ln(e, t) {
		var n = b(t.createElement(e)).appendTo(t.body), r = b.css(n[0], "display");
		return n.remove(), r
	}
	b.each(["height", "width"], function(e, n) {
		b.cssHooks[n] = {
			get : function(e, r, i) {
				return r ? 0 === e.offsetWidth && Xt.test(b.css(e, "display")) ? b.swap(e, Qt, function() {
					return sn(e, n, i)
				}) : sn(e, n, i) : t
			},
			set : function(e, t, r) {
				var i = r && Rt(e);
				return on(e, t, r ? an(e, n, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), b.support.opacity || (b.cssHooks.opacity = {
		get : function(e, t) {
			return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set : function(e, t) {
			var n = e.style, r = e.currentStyle, i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === b.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i)
		}
	}), b(function() {
		b.support.reliableMarginRight || (b.cssHooks.marginRight = {
			get : function(e, n) {
				return n ? b.swap(e, {
					display : "inline-block"
				}, Wt, [e, "marginRight"]) : t
			}
		}), !b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function(e, n) {
			b.cssHooks[n] = {
				get : function(e, r) {
					return r ? ( r = Wt(e, n), Yt.test(r) ? b(e).position()[n] + "px" : r) : t
				}
			}
		})
	}), b.expr && b.expr.filters && (b.expr.filters.hidden = function(e) {
		return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display"))
	}, b.expr.filters.visible = function(e) {
		return !b.expr.filters.hidden(e)
	}), b.each({
		margin : "",
		padding : "",
		border : "Width"
	}, function(e, t) {
		b.cssHooks[e + t] = {
			expand : function(n) {
				var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
				for (; 4 > r; r++)
					i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
				return i
			}
		}, Ut.test(e) || (b.cssHooks[e + t].set = on)
	});
	var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i;
	b.fn.extend({
		serialize : function() {
			return b.param(this.serializeArray())
		},
		serializeArray : function() {
			return this.map(function() {
				var e = b.prop(this, "elements");
				return e ? b.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !b(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Nt.test(e))
			}).map(function(e, t) {
				var n = b(this).val();
				return null == n ? null : b.isArray(n) ? b.map(n, function(e) {
					return {
						name : t.name,
						value : e.replace(fn, "\r\n")
					}
				}) : {
					name : t.name,
					value : n.replace(fn, "\r\n")
				}
			}).get()
		}
	}), b.param = function(e, n) {
		var r, i = [], o = function(e, t) {
			t = b.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
		};
		if (n === t && ( n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e))
			b.each(e, function() {
				o(this.name, this.value)
			});
		else
			for (r in e)gn(r, e[r], n, o);
		return i.join("&").replace(cn, "+")
	};
	function gn(e, t, n, r) {
		var i;
		if (b.isArray(t))
			b.each(t, function(t, i) {
				n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
			});
		else if (n || "object" !== b.type(t))
			r(e, t);
		else
			for (i in t)gn(e + "[" + i + "]", t[i], n, r)
	}
	b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		b.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), b.fn.hover = function(e, t) {
		return this.mouseenter(e).mouseleave(t || e)
	};
	var mn, yn, vn = b.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Cn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = b.fn.load, An = {}, jn = {}, Dn = "*/".concat("*");
	try {
		yn = a.href
	} catch(Ln) {
		yn = o.createElement("a"), yn.href = "", yn = yn.href
	}
	mn = En.exec(yn.toLowerCase()) || [];
	function Hn(e) {
		return function(t, n) {
			"string" != typeof t && ( n = t, t = "*");
			var r, i = 0, o = t.toLowerCase().match(w) || [];
			if (b.isFunction(n))
				while ( r = o[i++])"+" === r[0] ? ( r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}

	function qn(e, n, r, i) {
		var o = {}, a = e === jn;
		function s(u) {
			var l;
			return o[u] = !0, b.each(e[u] || [], function(e, u) {
				var c = u(n, r, i);
				return "string" != typeof c || a || o[c] ? a ? !( l = c) : t : (n.dataTypes.unshift(c), s(c), !1)
			}), l
		}
		return s(n.dataTypes[0]) || !o["*"] && s("*")
	}

	function Mn(e, n) {
		var r, i, o = b.ajaxSettings.flatOptions || {};
		for (i in n)n[i] !== t && ((o[i]?e:r||(r={}))[i] = n[i]);
		return r && b.extend(!0, e, r), e
	}
	b.fn.load = function(e, n, r) {
		if ("string" != typeof e && Sn)
			return Sn.apply(this, arguments);
		var i, o, a, s = this, u = e.indexOf(" ");
		return u >= 0 && ( i = e.slice(u, e.length), e = e.slice(0, u)), b.isFunction(n) ? ( r = n, n = t) : n && "object" == typeof n && ( a = "POST"), s.length > 0 && b.ajax({
			url : e,
			type : a,
			dataType : "html",
			data : n
		}).done(function(e) {
			o = arguments, s.html( i ? b("<div>").append(b.parseHTML(e)).find(i) : e)
		}).complete(r &&
		function(e, t) {
			s.each(r, o || [e.responseText, t, e])
		}), this
	}, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		b.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), b.each(["get", "post"], function(e, n) {
		b[n] = function(e, r, i, o) {
			return b.isFunction(r) && ( o = o || i, i = r, r = t), b.ajax({
				url : e,
				type : n,
				dataType : o,
				data : r,
				success : i
			})
		}
	}), b.extend({
		active : 0,
		lastModified : {},
		etag : {},
		ajaxSettings : {
			url : yn,
			type : "GET",
			isLocal : Nn.test(mn[1]),
			global : !0,
			processData : !0,
			async : !0,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			accepts : {
				"*" : Dn,
				text : "text/plain",
				html : "text/html",
				xml : "application/xml, text/xml",
				json : "application/json, text/javascript"
			},
			contents : {
				xml : /xml/,
				html : /html/,
				json : /json/
			},
			responseFields : {
				xml : "responseXML",
				text : "responseText"
			},
			converters : {
				"* text" : e.String,
				"text html" : !0,
				"text json" : b.parseJSON,
				"text xml" : b.parseXML
			},
			flatOptions : {
				url : !0,
				context : !0
			}
		},
		ajaxSetup : function(e, t) {
			return t ? Mn(Mn(e, b.ajaxSettings), t) : Mn(b.ajaxSettings, e)
		},
		ajaxPrefilter : Hn(An),
		ajaxTransport : Hn(jn),
		ajax : function(e, n) {
			"object" == typeof e && ( n = e, e = t), n = n || {};
			var r, i, o, a, s, u, l, c, p = b.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? b(f) : b.event, h = b.Deferred(), g = b.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, x = 0, T = "canceled", N = {
				readyState : 0,
				getResponseHeader : function(e) {
					var t;
					if (2 === x) {
						if (!c) {
							c = {};
							while ( t = Tn.exec(a))
							c[t[1].toLowerCase()] = t[2]
						}
						t = c[e.toLowerCase()]
					}
					return null == t ? null : t
				},
				getAllResponseHeaders : function() {
					return 2 === x ? a : null
				},
				setRequestHeader : function(e, t) {
					var n = e.toLowerCase();
					return x || ( e = v[n] = v[n] || e, y[e] = t), this
				},
				overrideMimeType : function(e) {
					return x || (p.mimeType = e), this
				},
				statusCode : function(e) {
					var t;
					if (e)
						if (2 > x)
							for (t in e)
							m[t] = [m[t], e[t]];
						else
							N.always(e[N.status]);
					return this
				},
				abort : function(e) {
					var t = e || T;
					return l && l.abort(t), k(0, t), this
				}
			};
			if (h.promise(N).complete = g.add, N.success = N.done, N.error = N.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = b.trim(p.dataType || "*").toLowerCase().match(w) || [""], null == p.crossDomain && ( r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (mn[3] || ("http:" === mn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), qn(An, p, n, N), 2 === x)
				return N;
			u = p.global, u && 0 === b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Cn.test(p.type), o = p.url, p.hasContent || (p.data && ( o = p.url += (bn.test(o) ? "&" : "?") + p.data,
			delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (b.lastModified[o] && N.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && N.setRequestHeader("If-None-Match", b.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && N.setRequestHeader("Content-Type", p.contentType), N.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
			for (i in p.headers)
			N.setRequestHeader(i, p.headers[i]);
			if (p.beforeSend && (p.beforeSend.call(f, N, p) === !1 || 2 === x))
				return N.abort();
			T = "abort";
			for (i in {
				success : 1,
				error : 1,
				complete : 1
			})N[i](p[i]);
			if ( l = qn(jn, p, n, N)) {
				N.readyState = 1, u && d.trigger("ajaxSend", [N, p]), p.async && p.timeout > 0 && ( s = setTimeout(function() {
					N.abort("timeout")
				}, p.timeout));
				try {
					x = 1, l.send(y, k)
				} catch(C) {
					if (!(2 > x))
						throw C;
					k(-1, C)
				}
			} else
				k(-1, "No Transport");
			function k(e, n, r, i) {
				var c, y, v, w, T, C = n;
				2 !== x && ( x = 2, s && clearTimeout(s), l = t, a = i || "", N.readyState = e > 0 ? 4 : 0, r && ( w = _n(p, N, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && ( T = N.getResponseHeader("Last-Modified"), T && (b.lastModified[o] = T), T = N.getResponseHeader("etag"), T && (b.etag[o] = T)), 204 === e ? ( c = !0, C = "nocontent") : 304 === e ? ( c = !0, C = "notmodified") : ( c = Fn(p, w), C = c.state, y = c.data, v = c.error, c = !v)) : ( v = C, (e || !C) && ( C = "error", 0 > e && ( e = 0))), N.status = e, N.statusText = (n || C) + "", c ? h.resolveWith(f, [y, C, N]) : h.rejectWith(f, [N, C, v]), N.statusCode(m), m = t, u && d.trigger( c ? "ajaxSuccess" : "ajaxError", [N, p, c ? y : v]), g.fireWith(f, [N, C]), u && (d.trigger("ajaxComplete", [N, p]), --b.active || b.event.trigger("ajaxStop")))
			}
			return N
		},
		getScript : function(e, n) {
			return b.get(e, t, n, "script")
		},
		getJSON : function(e, t, n) {
			return b.get(e, t, n, "json")
		}
	});
	function _n(e, n, r) {
		var i, o, a, s, u = e.contents, l = e.dataTypes, c = e.responseFields;
		for (s in c) s in r && (n[c[s]] = r[s]);
		while ("*" === l[0])l.shift(), o === t && ( o = e.mimeType || n.getResponseHeader("Content-Type"));
		if (o)
			for (s in u)
			if (u[s] && u[s].test(o)) {
				l.unshift(s);
				break
			}
		if (l[0] in r)
			a = l[0];
		else {
			for (s in r) {
				if (!l[0] || e.converters[s + " " + l[0]]) {
					a = s;
					break
				}
				i || ( i = s)
			}
			a = a || i
		}
		return a ? (a !== l[0] && l.unshift(a), r[a]) : t
	}

	function Fn(e, t) {
		var n, r, i, o, a = {}, s = 0, u = e.dataTypes.slice(), l = u[0];
		if (e.dataFilter && ( t = e.dataFilter(t, e.dataType)), u[1])
			for (i in e.converters)
			a[i.toLowerCase()] = e.converters[i];
		for (; r = u[++s]; )
			if ("*" !== r) {
				if ("*" !== l && l !== r) {
					if ( i = a[l + " " + r] || a["* " + r], !i)
						for (n in a)
						if ( o = n.split(" "), o[1] === r && ( i = a[l + " " + o[0]] || a["* " + o[0]])) {
							i === !0 ? i = a[n] : a[n] !== !0 && ( r = o[0], u.splice(s--, 0, r));
							break
						}
					if (i !== !0)
						if (i && e["throws"])
							t = i(t);
						else
							try {
								t = i(t)
							} catch(c) {
								return {
									state : "parsererror",
									error : i ? c : "No conversion from " + l + " to " + r
								}
							}
				}
				l = r
			}
		return {
			state : "success",
			data : t
		}
	}
	b.ajaxSetup({
		accepts : {
			script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents : {
			script : /(?:java|ecma)script/
		},
		converters : {
			"text script" : function(e) {
				return b.globalEval(e), e
			}
		}
	}), b.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), b.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, r = o.head || b("head")[0] || o.documentElement;
			return {
				send : function(t, i) {
					n = o.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort : function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var On = [], Bn = /(=)\?(?=&|$)|\?\?/;
	b.ajaxSetup({
		jsonp : "callback",
		jsonpCallback : function() {
			var e = On.pop() || b.expando + "_" + vn++;
			return this[e] = !0, e
		}
	}), b.ajaxPrefilter("json jsonp", function(n, r, i) {
		var o, a, s, u = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
		return u || "jsonp" === n.dataTypes[0] ? ( o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return s || b.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
			s = arguments
		}, i.always(function() {
			e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, On.push(o)), s && b.isFunction(a) && a(s[0]), s = a = t
		}), "script") : t
	});
	var Pn, Rn, Wn = 0, $n = e.ActiveXObject &&
	function() {
		var e;
		for (e in Pn)Pn[e](t, !0)
	};
	function In() {
		try {
			return new e.XMLHttpRequest
		} catch(t) {
		}
	}

	function zn() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch(t) {
		}
	}
	b.ajaxSettings.xhr = e.ActiveXObject ? function() {
		return !this.isLocal && In() || zn()
	} : In, Rn = b.ajaxSettings.xhr(), b.support.cors = !!Rn && "withCredentials" in Rn, Rn = b.support.ajax = !!Rn, Rn && b.ajaxTransport(function(n) {
		if (!n.crossDomain || b.support.cors) {
			var r;
			return {
				send : function(i, o) {
					var a, s, u = n.xhr();
					if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)
						for (s in n.xhrFields)
						u[s] = n.xhrFields[s];
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i)
						u.setRequestHeader(s, i[s])
					} catch(l) {
					}
					u.send(n.hasContent && n.data || null), r = function(e, i) {
						var s, l, c, p;
						try {
							if (r && (i || 4 === u.readyState))
								if ( r = t, a && (u.onreadystatechange = b.noop, $n &&
									delete Pn[a]), i)
									4 !== u.readyState && u.abort();
								else {
									p = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (p.text = u.responseText);
									try {
										c = u.statusText
									} catch(f) {
										c = ""
									}
									s || !n.isLocal || n.crossDomain ? 1223 === s && ( s = 204) : s = p.text ? 200 : 404
								}
						} catch(d) {
							i || o(-1, d)
						}
						p && o(s, c, p, l)
					}, n.async ? 4 === u.readyState ? setTimeout(r) : ( a = ++Wn, $n && (Pn || ( Pn = {}, b(e).unload($n)), Pn[a] = r), u.onreadystatechange = r) : r()
				},
				abort : function() {
					r && r(t, !0)
				}
			}
		}
	});
	var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = {
		"*" : [
		function(e, t) {
			var n, r, i = this.createTween(e, t), o = Yn.exec(t), a = i.cur(), s = +a || 0, u = 1, l = 20;
			if (o) {
				if ( n = +o[2], r = o[3] || (b.cssNumber[e] ? "" : "px"), "px" !== r && s) {
					s = b.css(i.elem, e, !0) || n || 1;
					do u = u || ".5", s /= u, b.style(i.elem, e, s + r);
					while(u!==(u=i.cur()/a)&&1!==u&&--l)
				}
				i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
			}
			return i
		}]

	};
	function Kn() {
		return setTimeout(function() {
			Xn = t
		}), Xn = b.now()
	}

	function Zn(e, t) {
		b.each(t, function(t, n) {
			var r = (Qn[t] || []).concat(Qn["*"]), i = 0, o = r.length;
			for (; o > i; i++)
				if (r[i].call(e, t, n))
					return
		})
	}

	function er(e, t, n) {
		var r, i, o = 0, a = Gn.length, s = b.Deferred().always(function() {
			delete u.elem
		}), u = function() {
			if (i)
				return !1;
			var t = Xn || Kn(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length;
			for (; u > a; a++)
				l.tweens[a].run(o);
			return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
		}, l = s.promise({
			elem : e,
			props : b.extend({}, t),
			opts : b.extend(!0, {
				specialEasing : {}
			}, n),
			originalProperties : t,
			originalOptions : n,
			startTime : Xn || Kn(),
			duration : n.duration,
			tweens : [],
			createTween : function(t, n) {
				var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
				return l.tweens.push(r), r
			},
			stop : function(t) {
				var n = 0, r = t ? l.tweens.length : 0;
				if (i)
					return this;
				for ( i = !0; r > n; n++)
					l.tweens[n].run(1);
				return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
			}
		}), c = l.props;
		for (tr(c, l.opts.specialEasing); a > o; o++)
			if ( r = Gn[o].call(l, e, c, l.opts))
				return r;
		return Zn(l, c), b.isFunction(l.opts.start) && l.opts.start.call(e, l), b.fx.timer(b.extend(u, {
			elem : e,
			anim : l,
			queue : l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}

	function tr(e, t) {
		var n, r, i, o, a;
		for (i in e)
		if ( r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && ( o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n,
		delete e[i]), a = b.cssHooks[r], a && "expand" in a) {
			n = a.expand(n),
			delete e[r];
			for (i in n) i in e || (e[i] = n[i], t[i] = o)
		} else
			t[r] = o
	}
	b.Animation = b.extend(er, {
		tweener : function(e, t) {
			b.isFunction(e) ? ( t = e, e = ["*"]) : e = e.split(" ");
			var n, r = 0, i = e.length;
			for (; i > r; r++)
				n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t)
		},
		prefilter : function(e, t) {
			t ? Gn.unshift(e) : Gn.push(e)
		}
	});
	function nr(e, t, n) {
		var r, i, o, a, s, u, l, c, p, f = this, d = e.style, h = {}, g = [], m = e.nodeType && nn(e);
		n.queue || ( c = b._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, p = c.empty.fire, c.empty.fire = function() {
			c.unqueued || p()
		}), c.unqueued++, f.always(function() {
			f.always(function() {
				c.unqueued--, b.queue(e, "fx").length || c.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== un(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", b.support.shrinkWrapBlocks || f.always(function() {
			d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
		}));
		for (i in t)
		if ( a = t[i], Vn.exec(a)) {
			if (
				delete t[i], u = u || "toggle" === a, a === ( m ? "hide" : "show"))
				continue;
			g.push(i)
		}
		if ( o = g.length) {
			s = b._data(e, "fxshow") || b._data(e, "fxshow", {}), "hidden" in s && ( m = s.hidden), u && (s.hidden = !m), m ? b(e).show() : f.done(function() {
				b(e).hide()
			}), f.done(function() {
				var t;
				b._removeData(e, "fxshow");
				for (t in h)
				b.style(e, t, h[t])
			});
			for ( i = 0; o > i; i++)
				r = g[i], l = f.createTween(r, m ? s[r] : 0), h[r] = s[r] || b.style(e, r), r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0))
		}
	}

	function rr(e, t, n, r, i) {
		return new rr.prototype.init(e, t, n, r, i)
	}
	b.Tween = rr, rr.prototype = {
		constructor : rr,
		init : function(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px")
		},
		cur : function() {
			var e = rr.propHooks[this.prop];
			return e && e.get ? e.get(this) : rr.propHooks._default.get(this)
		},
		run : function(e) {
			var t, n = rr.propHooks[this.prop];
			return this.pos = t = this.options.duration ? b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this
		}
	}, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
		_default : {
			get : function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? ( t = b.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set : function(e) {
				b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {
		set : function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, b.each(["toggle", "show", "hide"], function(e, t) {
		var n = b.fn[t];
		b.fn[t] = function(e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i)
		}
	}), b.fn.extend({
		fadeTo : function(e, t, n, r) {
			return this.filter(nn).css("opacity", 0).show().end().animate({
				opacity : t
			}, e, n, r)
		},
		animate : function(e, t, n, r) {
			var i = b.isEmptyObject(e), o = b.speed(t, n, r), a = function() {
				var t = er(this, b.extend({}, e), o);
				a.finish = function() {
					t.stop(!0)
				}, (i || b._data(this, "finish")) && t.stop(!0)
			};
			return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop : function(e, n, r) {
			var i = function(e) {
				var t = e.stop;
				delete e.stop, t(r)
			};
			return "string" != typeof e && ( r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0, n = null != e && e + "queueHooks", o = b.timers, a = b._data(this);
				if (n)
					a[n] && a[n].stop && i(a[n]);
				else
					for (n in a)a[n] && a[n].stop && Jn.test(n) && i(a[n]);
				for ( n = o.length; n--; )
					o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				(t || !r) && b.dequeue(this, e)
			})
		},
		finish : function(e) {
			return e !== !1 && ( e = e || "fx"), this.each(function() {
				var t, n = b._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = b.timers, a = r ? r.length : 0;
				for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--; )
					o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for ( t = 0; a > t; t++)
					r[t] && r[t].finish && r[t].finish.call(this);
				delete n.finish
			})
		}
	});
	function ir(e, t) {
		var n, r = {
			height : e
		}, i = 0;
		for ( t = t ? 1 : 0; 4 > i; i += 2 - t)
			n = Zt[i], r["margin" + n] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}
	b.each({
		slideDown : ir("show"),
		slideUp : ir("hide"),
		slideToggle : ir("toggle"),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function(e, t) {
		b.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), b.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? b.extend({}, e) : {
			complete : n || !n && t || b.isFunction(e) && e,
			duration : e,
			easing : n && t || t && !b.isFunction(t) && t
		};
		return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			b.isFunction(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue)
		}, r
	}, b.easing = {
		linear : function(e) {
			return e
		},
		swing : function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, b.timers = [], b.fx = rr.prototype.init, b.fx.tick = function() {
		var e, n = b.timers, r = 0;
		for ( Xn = b.now(); n.length > r; r++)
			e = n[r], e() || n[r] !== e || n.splice(r--, 1);
		n.length || b.fx.stop(), Xn = t
	}, b.fx.timer = function(e) {
		e() && b.timers.push(e) && b.fx.start()
	}, b.fx.interval = 13, b.fx.start = function() {
		Un || ( Un = setInterval(b.fx.tick, b.fx.interval))
	}, b.fx.stop = function() {
		clearInterval(Un), Un = null
	}, b.fx.speeds = {
		slow : 600,
		fast : 200,
		_default : 400
	}, b.fx.step = {}, b.expr && b.expr.filters && (b.expr.filters.animated = function(e) {
		return b.grep(b.timers, function(t) {
			return e === t.elem
		}).length
	}), b.fn.offset = function(e) {
		if (arguments.length)
			return e === t ? this : this.each(function(t) {
				b.offset.setOffset(this, e, t)
			});
		var n, r, o = {
			top : 0,
			left : 0
		}, a = this[0], s = a && a.ownerDocument;
		if (s)
			return n = s.documentElement, b.contains(n, a) ? ( typeof a.getBoundingClientRect !== i && ( o = a.getBoundingClientRect()), r = or(s), {
				top : o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
				left : o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
			}) : o
	}, b.offset = {
		setOffset : function(e, t, n) {
			var r = b.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i = b(e), o = i.offset(), a = b.css(e, "top"), s = b.css(e, "left"), u = ("absolute" === r || "fixed" === r) && b.inArray("auto", [a, s]) > -1, l = {}, c = {}, p, f;
			u ? ( c = i.position(), p = c.top, f = c.left) : ( p = parseFloat(a) || 0, f = parseFloat(s) || 0), b.isFunction(t) && ( t = t.call(e, n, o)), null != t.top && (l.top = t.top - o.top + p), null != t.left && (l.left = t.left - o.left + f), "using" in t ? t.using.call(e, l) : i.css(l)
		}
	}, b.fn.extend({
		position : function() {
			if (this[0]) {
				var e, t, n = {
					top : 0,
					left : 0
				}, r = this[0];
				return "fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : ( e = this.offsetParent(), t = this.offset(), b.nodeName(e[0], "html") || ( n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), n.left += b.css(e[0], "borderLeftWidth", !0)), {
					top : t.top - n.top - b.css(r, "marginTop", !0),
					left : t.left - n.left - b.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent : function() {
			return this.map(function() {
				var e = this.offsetParent || o.documentElement;
				while (e && !b.nodeName(e, "html") && "static" === b.css(e, "position"))
				e = e.offsetParent;
				return e || o.documentElement
			})
		}
	}), b.each({
		scrollLeft : "pageXOffset",
		scrollTop : "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		b.fn[e] = function(i) {
			return b.access(this, function(e, i, o) {
				var a = or(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : ( a ? a.scrollTo( r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o, t)
			}, e, i, arguments.length, null)
		}
	});
	function or(e) {
		return b.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	b.each({
		Height : "height",
		Width : "width"
	}, function(e, n) {
		b.each({
			padding : "inner" + e,
			content : n,
			"" : "outer" + e
		}, function(r, i) {
			b.fn[i] = function(i, o) {
				var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
				return b.access(this, function(n, r, i) {
					var o;
					return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? ( o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s)
				}, n, a ? i : t, a, null)
			}
		})
	}), e.jQuery = e.$ = b, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return b
	})
})(window);
/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute ===
void 0 && (jQuery.migrateMute = !0), function(e, t, n) {
	function r(n) {
		o[n] || (o[n] = !0, e.migrateWarnings.push(n), t.console && console.warn && !e.migrateMute && (console.warn("JQMIGRATE: " + n), e.migrateTrace && console.trace && console.trace()))
	}

	function a(t, a, o, i) {
		if (Object.defineProperty)
			try {
				return Object.defineProperty(t, a, {
					configurable : !0,
					enumerable : !0,
					get : function() {
						return r(i), o
					},
					set : function(e) {
						r(i), o = e
					}
				}), n
			} catch(s) {
			}
		e._definePropertyBroken = !0, t[a] = o
	}

	var o = {};
	e.migrateWarnings = [], !e.migrateMute && t.console && console.log && console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function() {
		o = {}, e.migrateWarnings.length = 0
	}, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
	var i = e("<input/>", {
		size : 1
	}).attr("size") && e.attrFn, s = e.attr, u = e.attrHooks.value && e.attrHooks.value.get ||
	function() {
		return null
	}, c = e.attrHooks.value && e.attrHooks.value.set ||
	function() {
		return n
	}, l = /^(?:input|button)$/i, d = /^[238]$/, p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, f = /^(?:checked|selected)$/i;
	a(e, "attrFn", i || {}, "jQuery.attrFn is deprecated"), e.attr = function(t, a, o, u) {
		var c = a.toLowerCase(), g = t && t.nodeType;
		return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && ( i ? a in i : e.isFunction(e.fn[a]))) ? e(t)[a](o) : ("type" === a && o !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
			get : function(t, r) {
				var a, o = e.prop(t, r);
				return o === !0 || "boolean" != typeof o && ( a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
			},
			set : function(t, n, r) {
				var a;
				return n === !1 ? e.removeAttr(t, r) : ( a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
			}
		}, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, o))
	}, e.attrHooks.value = {
		get : function(e, t) {
			var n = (e.nodeName || "").toLowerCase();
			return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
		},
		set : function(e, t) {
			var a = (e.nodeName || "").toLowerCase();
			return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
		}
	};
	var g, h, v = e.fn.init, m = e.parseJSON, y = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
	e.fn.init = function(t, n, a) {
		var o;
		return t && "string" == typeof t && !e.isPlainObject(n) && ( o = y.exec(t)) && o[1] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), n && n.context && ( n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(e.trim(t), n, !0), n, a) : v.apply(this, arguments)
	}, e.fn.init.prototype = e.fn, e.parseJSON = function(e) {
		return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
	}, e.uaMatch = function(e) {
		e = e.toLowerCase();
		var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
		return {
			browser : t[1] || "",
			version : t[2] || "0"
		}
	}, e.browser || ( g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
		function t(e, n) {
			return new t.fn.init(e, n)
		}
		e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(r, a) {
			return a && a instanceof e && !( a instanceof t) && ( a = t(a)), e.fn.init.call(this, r, a, n)
		}, t.fn.init.prototype = t.fn;
		var n = t(document);
		return r("jQuery.sub() is deprecated"), t
	}, e.ajaxSetup({
		converters : {
			"text json" : e.parseJSON
		}
	});
	var b = e.fn.data;
	e.fn.data = function(t) {
		var a, o, i = this[0];
		return !i || "events" !== t || 1 !== arguments.length || ( a = e.data(i, t), o = e._data(i, t), a !== n && a !== o || o === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), o)
	};
	var j = /\/(java|ecma)script/i, w = e.fn.andSelf || e.fn.addBack;
	e.fn.andSelf = function() {
		return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
	}, e.clean || (e.clean = function(t, a, o, i) {
		a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
		var s, u, c, l, d = [];
		if (e.merge(d, e.buildFragment(t, a).childNodes), o)
			for ( c = function(e) {
				return !e.type || j.test(e.type) ? i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : o.appendChild(e) : n
			}, s = 0; null != ( u = d[s]); s++)
				e.nodeName(u, "script") && c(u) || (o.appendChild(u), u.getElementsByTagName !== n && ( l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
		return d
	});
	var Q = e.event.add, x = e.event.remove, k = e.event.trigger, N = e.fn.toggle, C = e.fn.live, S = e.fn.die, T = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", M = RegExp("\\b(?:" + T + ")\\b"), H = /(?:^|\s)hover(\.\S+|)\b/, A = function(t) {
		return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
	};
	e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e, t, n, a, o) {
		e !== document && M.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, o)
	}, e.event.remove = function(e, t, n, r, a) {
		x.call(this, e, A(t) || "", n, r, a)
	}, e.fn.error = function() {
		var e = Array.prototype.slice.call(arguments, 0);
		return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
	}, e.fn.toggle = function(t, n) {
		if (!e.isFunction(t) || !e.isFunction(n))
			return N.apply(this, arguments);
		r("jQuery.fn.toggle(handler, handler...) is deprecated");
		var a = arguments, o = t.guid || e.guid++, i = 0, s = function(n) {
			var r = (e._data(this, "lastToggle" + t.guid) || 0) % i;
			return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
		};
		for (s.guid = o; a.length > i; )
			a[i++].guid = o;
		return this.click(s)
	}, e.fn.live = function(t, n, a) {
		return r("jQuery.fn.live() is deprecated"), C ? C.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
	}, e.fn.die = function(t, n) {
		return r("jQuery.fn.die() is deprecated"), S ? S.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
	}, e.event.trigger = function(e, t, n, a) {
		return n || M.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
	}, e.each(T.split("|"), function(t, n) {
		e.event.special[n] = {
			setup : function() {
				var t = this;
				return t !== document && (e.event.add(document, n + "." + e.guid, function() {
					e.event.trigger(n, null, t, !0)
				}), e._data(this, n, e.guid++)), !1
			},
			teardown : function() {
				return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
			}
		}
	})
}(jQuery, window);
(function($, p) {
	var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {};
	function E(F) {
		return typeof F === "string"
	}

	function B(G) {
		var F = m.call(arguments, 1);
		return function() {
			return G.apply(this, F.concat(m.call(arguments)))
		}
	}

	function n(F) {
		return F.replace(/^[^#]*#?(.*)$/, "$1")
	}

	function o(F) {
		return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
	}

	function f(H, M, F, I, G) {
		var O, L, K, N, J;
		if (I !== i) {
			K = F.match( H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
			J = K[3] || "";
			if (G === 2 && E(I)) {
				L = I.replace( H ? w : x, "")
			} else {
				N = l(K[2]);
				I = E(I) ? l[H?D:A](I) : I;
				L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I);
				L = a(L);
				if (H) {
					L = L.replace(h, r)
				}
			}
			O = K[1] + ( H ? "#" : L || !K[1] ? "?" : "") + L + J
		} else {
			O = M(F !== i ? F : p[g][k])
		}
		return O
	}
	a[A] = B(f, 0, o);
	a[D] = c = B(f, 1, n);
	c.noEscape = function(G) {
		G = G || "";
		var F = $.map(G.split(""), encodeURIComponent);
		h = new RegExp(F.join("|"), "g")
	};
	c.noEscape(",/");
	$.deparam = l = function(I, F) {
		var H = {}, G = {
			"true" : !0,
			"false" : !1,
			"null" : null
		};
		$.each(I.replace(/\+/g, " ").split("&"), function(L, Q) {
			var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P.split("]["), N = R.length - 1;
			if (/\[/.test(R[0]) && /\]$/.test(R[N])) {
				R[N] = R[N].replace(/\]$/, "");
				R = R.shift().split("[").concat(R);
				N = R.length - 1
			} else {
				N = 0
			}
			if (K.length === 2) {
				J = r(K[1]);
				if (F) {
					J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J
				}
				if (N) {
					for (; M <= N; M++) {
						P = R[M] === "" ? O.length : R[M];
						O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J
					}
				} else {
					if ($.isArray(H[P])) {
						H[P].push(J)
					} else {
						if (H[P] !== i) {
							H[P] = [H[P], J]
						} else {
							H[P] = J
						}
					}
				}
			} else {
				if (P) {
					H[P] = F ? i : ""
				}
			}
		});
		return H
	};
	function z(H, F, G) {
		if (F === i || typeof F === "boolean") {
			G = F;
			F = a[H?D:A]()
		} else {
			F = E(F) ? F.replace( H ? w : x, "") : F
		}
		return l(F, G)
	}
	l[A] = B(z, 0);
	l[D] = v = B(z, 1);
	$[y] || ($[y] = function(F) {
		return $.extend(C, F)
	})({
		a : k,
		base : k,
		iframe : t,
		img : t,
		input : t,
		form : "action",
		link : k,
		script : t
	});
	j = $[y];
	function s(I, G, H, F) {
		if (!E(H) && typeof H !== "object") {
			F = H;
			H = G;
			G = i
		}
		return this.each(function() {
			var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()] || "", K = J && L.attr(J) || "";
			L.attr(J, a[I](K, H, F))
		})
	}

	$.fn[A] = B(s, A);
	$.fn[D] = B(s, D);
	b.pushState = q = function(I, F) {
		if (E(I) && /^#/.test(I) && F === i) {
			F = 2
		}
		var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2);
		p[g][k] = G + (/#/.test(G) ? "" : "#")
	};
	b.getState = u = function(F, G) {
		return F === i || typeof F === "boolean" ? v(F) : v(G)[F]
	};
	b.removeState = function(F) {
		var G = {};
		if (F !== i) {
			G = u();
			$.each($.isArray(F) ? F : arguments, function(I, H) {
				delete G[H]
			})
		}
		q(G, 2)
	};
	e[d] = $.extend(e[d], {
		add : function(F) {
			var H;
			function G(J) {
				var I = J[D] = c();
				J.getState = function(K, L) {
					return K === i || typeof K === "boolean" ? l(I, K) : l(I,L)[K]
				};
				H.apply(this, arguments)
			}

			if ($.isFunction(F)) {
				H = F;
				return G
			} else {
				H = F.handler;
				F.handler = G
			}
		}
	})
})(jQuery, this);
(function($, i, b) {
	var j, k = $.event.special, c = "location", d = "hashchange", l = "href", f = $.browser, g = document.documentMode, h = f.msie && (g === b || g < 8), e = "on" + d in i && !h;
	function a(m) {
		m = m || i[c][l];
		return m.replace(/^[^#]*#?(.*)$/, "$1")
	}
	$[d + "Delay"] = 100;
	k[d] = $.extend(k[d], {
		setup : function() {
			if (e) {
				return false
			}
			$(j.start)
		},
		teardown : function() {
			if (e) {
				return false
			}
			$(j.stop)
		}
	});
	j = (function() {
		var m = {}, r, n, o, q;
		function p() {
			o = q = function(s) {
				return s
			};
			if (h) {
				n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
				q = function() {
					return a(n.document[c][l])
				};
				o = function(u, s) {
					if (u !== s) {
						var t = n.document;
						t.open().close();
						t[c].hash = "#" + u
					}
				};
				o(a())
			}
		}
		m.start = function() {
			if (r) {
				return
			}
			var t = a();
			o || p();
			(function s() {
				var v = a(), u = q(t);
				if (v !== t) {
					o( t = v, u);
					$(i).trigger(d)
				} else {
					if (u !== t) {
						i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u
					}
				}
				r = setTimeout(s, $[d + "Delay"])
			})()
		};
		m.stop = function() {
			if (!n) {
				r && clearTimeout(r);
				r = 0
			}
		};
		return m
	})()
})(jQuery, this);
(function(a) {
	function u(i, b) {
		function g(i) {
			return a.isArray(n.readonly) ? ( i = a(".dwwl", B).index(i), n.readonly[i]) : n.readonly
		}

		function l(a) {
			var i = '<div class="dw-bf">', d = 1, b;
			for (b in $[a])0 == d % 20 && (i += '</div><div class="dw-bf">'), i += '<div class="dw-li dw-v" data-val="' + b + '" style="height:' + N + "px;line-height:" + N + 'px;"><div class="dw-i">' + $[a][b] + "</div></div>", d++;
			return i + "</div>"
		}

		function q(i) {
			e = a(".dw-li", i).index(a(".dw-v", i).eq(0));
			r = a(".dw-li", i).index(a(".dw-v", i).eq(-1));
			C = a(".dw-ul", B).index(i);
			c = N;
			w = o;
			speedUnit = n.speedUnit
		}

		function t(a) {
			var i = n.headerText;
			return i ? "function" === typeof i ? i.call(S, a) : i.replace(/\{value\}/i, a) : ""
		}

		function k() {
			o.temp = Y && null !== o.val && o.val != G.val() || null === o.values ? n.parseValue(G.val() || "", o) : o.values.slice(0);
			o.setValue(!0)
		}

		function m(i, d, b, e, c) {
			!1 !== J("validate", [B, d, i]) && (a(".dw-ul", B).each(function(b) {
				var s = a(this), h = a('.dw-li[data-val="' + o.temp[b] + '"]', s), f = a(".dw-li", s), g = f.index(h), n = f.length, j = b == d ||
				void 0 === d;
				if (!h.hasClass("dw-v")) {
					for (var D = h, l = 0, q = 0; 0 <= g - l && !D.hasClass("dw-v"); )
						l++, D = f.eq(g - l);
					for (; g + q < n && !h.hasClass("dw-v"); )
						q++, h = f.eq(g + q);
					(q < l && q && 2 !== e || !l || 0 > g - l || 1 == e) && h.hasClass("dw-v") ? g += q : ( h = D, g -= l)
				}
				if (!h.hasClass("dw-sel") || j)
					o.temp[b] = h.attr("data-val"), a(".dw-sel", s).removeClass("dw-sel"), h.addClass("dw-sel"), o.scroll(s, b, g, j ? i : 0.1, j ? c :
					void 0)
			}), o.change(b))
		}

		function u(i) {
			if (!("inline" == n.display || T === a(window).width() && ea === a(window).height() && i || !1 === J("onPosition", [B]))) {
				var d, b, h, s, e, c, g, f, l, j = 0, q = 0, i = a(window).scrollTop();
				s = a(".dwwr", B);
				var D = a(".dw", B), o = {};
				e =
				void 0 === n.anchor ? G : n.anchor;
				T = a(window).width();
				ea = a(window).height();
				P = ( P = window.innerHeight) || ea;
				/modal|bubble/.test(n.display) && (a(".dwc", B).each(function() {
					d = a(this).outerWidth(!0);
					j += d;
					q = d > q ? d : q
				}), d = j > T ? q : j, s.width(d));
				W = D.outerWidth();
				Q = D.outerHeight(!0);
				"modal" == n.display ? ( b = (T - W) / 2, h = i + (P - Q) / 2) : "bubble" == n.display ? ( l = !0, f = a(".dw-arrw-i", B), b = e.offset(), c = b.top, g = b.left, s = e.outerWidth(), e = e.outerHeight(), b = g - (D.outerWidth(!0) - s) / 2, b = b > T - W ? T - (W + 20) : b, b = 0 <= b ? b : 20, h = c - Q, h < i || c > i + P ? (D.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"), h = c + e) : D.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"), f = f.outerWidth(), s = g + s / 2 - (b + (W - f) / 2), a(".dw-arr", B).css({
					left : s > f ? f : s
				})) : (o.width = "100%", "top" == n.display ? h = i : "bottom" == n.display && ( h = i + P - Q));
				o.top = 0 > h ? 0 : h;
				o.left = b;
				D.css(o);
				a(".dw-persp", B).height(0).height(h + Q > a(document).height() ? h + Q : a(document).height());
				l && (h + Q > i + P || c > i + P) && a(window).scrollTop(h + Q - P)
			}
		}

		function ga(a) {
			if ("touchstart" === a.type)
				K = !0, setTimeout(function() {
					K = !1
				}, 500);
			else if (K)
				return K = !1;
			return !0
		}

		function J(i, d) {
			var h;
			d.push(o);
			a.each([aa.defaults, ba, b], function(a, b) {
				b[i] && ( h = b[i].apply(S, d))
			});
			return h
		}

		function ma(a) {
			var i = +a.data("pos") + 1;
			j(a, i > r ? e : i, 1, !0)
		}

		function na(a) {
			var i = +a.data("pos") - 1;
			j(a, i < e ? r : i, 2, !0)
		}

		var ha, N, R, B, T, P, ea, W, Q, U, ia, o = this, fa = a.mobiscroll, S = i, G = a(S), aa, ja, n = H({}, ka), ba = {}, $ = [], X = {}, ca = {}, Y = G.is("input"), V = !1;
		o.enable = function() {
			n.disabled = !1;
			Y && G.prop("disabled", !1)
		};
		o.disable = function() {
			n.disabled = !0;
			Y && G.prop("disabled", !0)
		};
		o.scroll = function(a, i, b, d, e) {
			function c() {
				clearInterval(X[i]);
				delete X[i];
				a.data("pos", b).closest(".dwwl").removeClass("dwa")
			}

			var g = (ha - b) * N, f = s.replace(/^\-/, "").replace("moz", "Moz"), j = a[0].style, D;
			g == ca[i] && X[i] || (d && g != ca[i] && J("onAnimStart", [B, i, d]), ca[i] = g, j[f + "Transition"] = "all " + ( d ? d.toFixed(3) : 0) + "s ease-out", h ? j[f + "Transform"] = "translate3d(0," + g + "px,0)" : j.top = g + "px", X[i] && c(), d &&
			void 0 !== e ? ( D = 0, a.closest(".dwwl").addClass("dwa"), X[i] = setInterval(function() {
				D += 0.1;
				a.data("pos", Math.round((b - e) * Math.sin(D / d * (Math.PI / 2)) + e));
				D >= d && c()
			}, 100)) : a.data("pos", b))
		};
		o.setValue = function(i, b, d, h) {
			a.isArray(o.temp) || (o.temp = n.parseValue(o.temp + "", o));
			V && i && m(d);
			R = n.formatResult(o.temp);
			h || (o.values = o.temp.slice(0), o.val = R);
			b && Y && G.val(R).trigger("change")
		};
		o.getValues = function() {
			var a = [], i;
			for (i in o._selectedValues)
			a.push(o._selectedValues[i]);
			return a
		};
		o.validate = function(a, i, b, d) {
			m(b, a, !0, i, d)
		};
		o.change = function(i) {
			R = n.formatResult(o.temp);
			"inline" == n.display ? o.setValue(!1, i) : a(".dwv", B).html(t(R));
			i && J("onChange", [R])
		};
		o.changeWheel = function(i, b) {
			if (B) {
				var d = 0, h, e, s = i.length;
				for (h in n.wheels)
				for (e in n.wheels[h]) {
					if (-1 < a.inArray(d, i) && ($[d] = n.wheels[h][e], a(".dw-ul", B).eq(d).html(l(d)), s--, !s)) {
						u();
						m(b,
						void 0, !0);
						return
					}
					d++
				}
			}
		};
		o.isVisible = function() {
			return V
		};
		o.tap = function(a, i) {
			var d, b;
			n.tap && a.bind("touchstart", function(a) {
				a.preventDefault();
				d = z(a, "X");
				b = z(a, "Y")
			}).bind("touchend", function(a) {
				20 > Math.abs(z(a, "X") - d) && 20 > Math.abs(z(a, "Y") - b) && i.call(this, a);
				M = !0;
				setTimeout(function() {
					M = !1
				}, 300)
			});
			a.bind("click", function(a) {
				M || i.call(this, a)
			})
		};
		o.show = function(i) {
			if (n.disabled || V)
				return !1;
			"top" == n.display && ( U = "slidedown");
			"bottom" == n.display && ( U = "slideup");
			k();
			J("onBeforeShow", []);
			var b = 0, h, e = "";
			U && !i && ( e = "dw-" + U + " dw-in");
			for (var c = '<div class="dw-trans ' + n.theme + " dw-" + n.display + " dw" + s + '">' + ("inline" == n.display ? '<div class="dw dwbg dwi"><div class="dwwr">' : '<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg ' + e + '"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">' + (n.headerText ? '<div class="dwv"></div>' : "")), i = 0; i < n.wheels.length; i++) {
				c += '<div class="dwc' + ("scroller" != n.mode ? " dwpm" : " dwsc") + (n.showLabel ? "" : " dwhl") + '"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
				for (h in n.wheels[i])$[b] = n.wheels[i][h], c += '<td><div class="dwwl dwrc dwwl' + b + '">' + ("scroller" != n.mode ? '<div class="dwwb dwwbp" style="height:' + N + "px;line-height:" + N + 'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:' + N + "px;line-height:" + N + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + h + '</div><div class="dwww"><div class="dww" style="height:' + n.rows * N + "px;min-width:" + n.width + 'px;"><div class="dw-ul">', c += l(b), c += '</div><div class="dwwol"></div></div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>', b++;
				c += "</tr></table></div></div>"
			}
			c += ("inline" != n.display ? '<div class="dwbc' + (n.button3 ? " dwbc-p" : "") + '"><span class="dwbw dwb-s"><span class="dwb">' + n.setText + "</span></span>" + (n.button3 ? '<span class="dwbw dwb-n"><span class="dwb">' + n.button3Text + "</span></span>" : "") + '<span class="dwbw dwb-c"><span class="dwb">' + n.cancelText + "</span></span></div></div>" : '<div class="dwcc"></div>') + "</div></div></div>";
			B = a(c);
			m();
			J("onMarkupReady", [B]);
			"inline" != n.display ? (B.appendTo("body"), setTimeout(function() {
				B.removeClass("dw-trans").find(".dw").removeClass(e)
			}, 350)) : G.is("div") ? G.html(B) : B.insertAfter(G);
			J("onMarkupInserted", [B]);
			V = !0;
			aa.init(B, o);
			"inline" != n.display && (o.tap(a(".dwb-s span", B), function() {
				if (o.hide(false, "set") !== false) {
					o.setValue(false, true);
					J("onSelect", [o.val])
				}
			}), o.tap(a(".dwb-c span", B), function() {
				o.cancel()
			}), n.button3 && o.tap(a(".dwb-n span", B), n.button3), n.scrollLock && B.bind("touchmove", function(a) {
				Q <= P && W <= T && a.preventDefault()
			}), a("input,select,button").each(function() {
				a(this).prop("disabled") || a(this).addClass("dwtd").prop("disabled", true)
			}), u(), a(window).bind("orientationchange.dw resize.dw", function() {
				clearTimeout(ia);
				ia = setTimeout(function() {
					u(true)
				}, 100)
			}));
			B.delegate(".dwwl", "DOMMouseScroll mousewheel", function(i) {
				if (!g(this)) {
					i.preventDefault();
					var i = i.originalEvent, i = i.wheelDelta ? i.wheelDelta / 120 : i.detail ? -i.detail / 3 : 0, b = a(".dw-ul", this), d = +b.data("pos"), d = Math.round(d - i);
					q(b);
					j(b, d, i < 0 ? 1 : 2)
				}
			}).delegate(".dwb, .dwwb", Z, function() {
				a(this).addClass("dwb-a")
			}).delegate(".dwwb", Z, function(i) {
				i.stopPropagation();
				i.preventDefault();
				var b = a(this).closest(".dwwl");
				if (ga(i) && !g(b) && !b.hasClass("dwa")) {
					x = true;
					var d = b.find(".dw-ul"), h = a(this).hasClass("dwwbp") ? ma : na;
					q(d);
					clearInterval(I);
					I = setInterval(function() {
						h(d)
					}, n.delay);
					h(d)
				}
			}).delegate(".dwwl", Z, function(i) {
				i.preventDefault();
				if (ga(i) && !f && !g(this) && !x) {
					f = true;
					a(document).bind(D, la);
					A = a(".dw-ul", this);
					d = n.mode != "clickpick";
					E = +A.data("pos");
					q(A);
					F = X[C] !==
					void 0;
					v = z(i, "Y");
					L = new Date;
					y = v;
					o.scroll(A, C, E, 0.0010);
					d && A.closest(".dwwl").addClass("dwa")
				}
			});
			J("onShow", [B, R])
		};
		o.hide = function(i, b) {
			if (!V || !1 === J("onClose", [R, b]))
				return !1;
			a(".dwtd").prop("disabled", !1).removeClass("dwtd");
			G.blur();
			B && ("inline" != n.display && U && !i ? (B.addClass("dw-trans").find(".dw").addClass("dw-" + U + " dw-out"), setTimeout(function() {
				B.remove();
				B = null
			}, 350)) : (B.remove(), B = null), V = !1, ca = {}, a(window).unbind(".dw"))
		};
		o.cancel = function() {
			!1 !== o.hide(!1, "cancel") && J("onCancel", [o.val])
		};
		o.init = function(a) {
			aa = H({
				defaults : {},
				init : p
			}, fa.themes[a.theme || n.theme]);
			ja = fa.i18n[a.lang || n.lang];
			H(b, a);
			H(n, aa.defaults, ja, b);
			o.settings = n;
			G.unbind(".dw");
			if ( a = fa.presets[n.preset])
				ba = a.call(S, o), H(n, ba, b), H(da, ba.methods);
			ha = Math.floor(n.rows / 2);
			N = n.height;
			U = n.animate;
			void 0 !== G.data("dwro") && (S.readOnly = O(G.data("dwro")));
			V && o.hide();
			"inline" == n.display ? o.show() : (k(), Y && n.showOnFocus && (G.data("dwro", S.readOnly), S.readOnly = !0, G.bind("focus.dw", function() {
				o.show()
			})))
		};
		o.trigger = function(a, i) {
			return J(a, i)
		};
		o.values = null;
		o.val = null;
		o.temp = null;
		o._selectedValues = {};
		o.init(b)
	}

	function k(a) {
		for (var d in a)
		if (
			void 0 !== b[a[d]])
			return !0;
		return !1
	}

	function m(a) {
		return g[a.id]
	}

	function z(a, b) {
		var d = a.originalEvent, h = a.changedTouches;
		return h || d && d.changedTouches ? d ? d.changedTouches[0]["page" + b] : h[0]["page" + b] : a["page" + b]
	}

	function O(a) {
		return !0 === a || "true" == a
	}

	function t(a, b, d) {
		a = a > d ? d : a;
		return a < b ? b : a
	}

	function j(i, b, d, h, c) {
		var b = t(b, e, r), s = a(".dw-li", i).eq(b), g =
		void 0 === c ? b : c, f = C, D = h ? b == g ? 0.1 : Math.abs((b - g) * w.settings.timeUnit) : 0;
		w.temp[f] = s.attr("data-val");
		w.scroll(i, f, b, D, c);
		setTimeout(function() {
			w.validate(f, d, D, c)
		}, 10)
	}

	function l(a, b, d) {
		return da[b] ? da[b].apply(a, Array.prototype.slice.call(d, 1)) : "object" === typeof b ? da.init.call(a, b) : a
	}

	var g = {}, I, p = function() {
	}, c, e, r, w, q = (new Date).getTime(), f, x, A, C, v, y, L, E, F, d, b = document.createElement("modernizr").style, h = k(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), s = function() {
		var a = ["Webkit", "Moz", "O", "ms"], b;
		for (b in a)
		if (k([a[b] + "Transform"]))
			return "-" + a[b].toLowerCase();
		return ""
	}(), H = a.extend, M, K, Z = "touchstart mousedown", D = "touchmove mousemove", la = function(a) {
		d && (a.preventDefault(), y = z(a, "Y"), w.scroll(A, C, t(E + (v - y) / c, e - 1, r + 1)));
		F = !0
	}, ka = {
		width : 70,
		height : 40,
		rows : 3,
		delay : 300,
		disabled : !1,
		readonly : !1,
		showOnFocus : !0,
		showLabel : !0,
		wheels : [],
		theme : "",
		headerText : "{value}",
		display : "modal",
		mode : "scroller",
		preset : "",
		lang : "en-US",
		setText : "Set",
		cancelText : "Cancel",
		scrollLock : !0,
		tap : !0,
		speedUnit : 0.0012,
		timeUnit : 0.1,
		formatResult : function(a) {
			return a.join(" ")
		},
		parseValue : function(a, b) {
			var d = b.settings.wheels, h = a.split(" "), c = [], e = 0, s, g, f;
			for ( s = 0; s < d.length; s++)
				for (g in d[s]) {
					if (
						void 0 !== d[s][g][h[e]])
						c.push(h[e]);
					else
						for (f in d[s][g]) {
							c.push(f);
							break
						}
					e++
				}
			return c
		}
	}, da = {
		init : function(a) {
			void 0 === a && ( a = {});
			return this.each(function() {
				this.id || (q += 1, this.id = "scoller" + q);
				g[this.id] = new u(this, a)
			})
		},
		enable : function() {
			return this.each(function() {
				var a = m(this);
				a && a.enable()
			})
		},
		disable : function() {
			return this.each(function() {
				var a = m(this);
				a && a.disable()
			})
		},
		isDisabled : function() {
			var a = m(this[0]);
			if (a)
				return a.settings.disabled
		},
		isVisible : function() {
			var a = m(this[0]);
			if (a)
				return a.isVisible()
		},
		option : function(a, b) {
			return this.each(function() {
				var d = m(this);
				if (d) {
					var h = {};
					"object" === typeof a ? h = a : h[a] = b;
					d.init(h)
				}
			})
		},
		setValue : function(a, b, d, h) {
			return this.each(function() {
				var c = m(this);
				c && (c.temp = a, c.setValue(!0, b, d, h))
			})
		},
		getInst : function() {
			return m(this[0])
		},
		getValue : function() {
			var a = m(this[0]);
			if (a)
				return a.values
		},
		getValues : function() {
			var a = m(this[0]);
			if (a)
				return a.getValues()
		},
		show : function() {
			var a = m(this[0]);
			if (a)
				return a.show()
		},
		hide : function() {
			return this.each(function() {
				var a = m(this);
				a && a.hide()
			})
		},
		destroy : function() {
			return this.each(function() {
				var b = m(this);
				b && (b.hide(), a(this).unbind(".dw"),
				delete g[this.id], a(this).is("input") && (this.readOnly = O(a(this).data("dwro"))))
			})
		}
	};
	a(document).bind("touchend mouseup", function() {
		if (f) {
			var b = new Date - L, h = t(E + (v - y) / c, e - 1, r + 1), s, g = A.offset().top;
			300 > b ? ( b = (y - v) / b, s = b * b / w.settings.speedUnit, 0 > y - v && ( s = -s)) : s = y - v;
			b = Math.round(E - s / c);
			if (!s && !F) {
				var g = Math.floor((y - g) / c), q = a(".dw-li", A).eq(g);
				s = d;
				!1 !== w.trigger("onValueTap", [q]) ? b = g : s = !0;
				s && (q.addClass("dw-hl"), setTimeout(function() {
					q.removeClass("dw-hl")
				}, 200))
			}
			d && j(A, b, 0, !0, Math.round(h));
			f = !1;
			A = null;
			a(document).unbind(D, la)
		}
		x && (clearInterval(I), x = !1);
		a(".dwb-a").removeClass("dwb-a")
	}).bind("mouseover mouseup mousedown click", function(a) {
		if (M)
			return a.stopPropagation(), a.preventDefault(), !1
	});
	a.fn.mobiscroll = function(b) {
		H(this, a.mobiscroll.shorts);
		return l(this, b, arguments)
	};
	a.mobiscroll = a.mobiscroll || {
		setDefaults : function(a) {
			H(ka, a)
		},
		presetShort : function(a) {
			this.shorts[a] = function(b) {
				return l(this, H(b, {
					preset : a
				}), arguments)
			}
		},
		shorts : {},
		presets : {},
		themes : {},
		i18n : {}
	};
	a.scroller = a.scroller || a.mobiscroll;
	a.fn.scroller = a.fn.scroller || a.fn.mobiscroll
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.hu = a.extend(a.mobiscroll.i18n.hu, {
		setText : "OK",
		cancelText : "M\u00e9gse",
		dateFormat : "dd.mm.yy",
		dateOrder : "ddmmyy",
		dayNames : "Vas\u00e1rnap,H\u00e9tf\u0151,Kedd,Szerda,Cs\u00fct\u00f6rt\u00f6k,P\u00e9ntek,Szombat".split(","),
		dayNamesShort : "Va,H\u00e9,Ke,Sze,Cs\u00fc,P\u00e9,Szo".split(","),
		dayText : "Nap",
		hourText : "\u00d3ra",
		minuteText : "Perc",
		monthNames : "Janu\u00e1r,Febru\u00e1r,M\u00e1rcius,\u00c1prilis,M\u00e1jus,J\u00fanius,J\u00falius,Augusztus,Szeptember,Okt\u00f3ber,November,December".split(","),
		monthNamesShort : "Jan,Feb,M\u00e1r,\u00c1pr,M\u00e1j,J\u00fan,J\u00fal,Aug,Szep,Okt,Nov,Dec".split(","),
		monthText : "H\u00f3nap",
		secText : "M\u00e1sodperc",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "\u00c9v",
		nowText : "Most",
		wholeText : "Eg\u00e9sz",
		fractionText : "T\u00f6rt",
		unitText : "Egys\u00e9g",
		labels : "\u00c9v,H\u00f3nap,Nap,\u00d3ra,Perc,M\u00e1sodperc,".split(","),
		labelsShort : "\u00c9v,H\u00f3.,Nap,\u00d3ra,Perc,Mp.,".split(","),
		startText : "Ind\u00edt",
		stopText : "Meg\u00e1ll\u00edt",
		resetText : "Vissza\u00e1ll\u00edt",
		lapText : "Lap",
		hideText : "Elrejt"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.de = a.extend(a.mobiscroll.i18n.de, {
		setText : "OK",
		cancelText : "Abbrechen",
		dateFormat : "dd.mm.yy",
		dateOrder : "ddmmyy",
		dayNames : "Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag".split(","),
		dayNamesShort : "So,Mo,Di,Mi,Do,Fr,Sa".split(","),
		dayText : "Tag",
		hourText : "Stunde",
		minuteText : "Minuten",
		monthNames : "Januar,Februar,M\u00e4rz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember".split(","),
		monthNamesShort : "Jan,Feb,M\u00e4r,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez".split(","),
		monthText : "Monat",
		secText : "Sekunden",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "Jahr",
		nowText : "Jetzt",
		wholeText : "Ganze Zahl",
		fractionText : "Bruchzahl",
		unitText : "Ma\u00dfeinheit",
		labels : "Jahre,Monate,Tage,Stunden,Minuten,Sekunden,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Start",
		stopText : "Stop",
		resetText : "Reset",
		lapText : "Lap",
		hideText : "Hide"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.es = a.extend(a.mobiscroll.i18n.es, {
		setText : "Aceptar",
		cancelText : "Cancelar",
		dateFormat : "dd/mm/yy",
		dateOrder : "ddmmyy",
		dayNames : "Domingo,Lunes,Martes,Mi&#xE9;rcoles,Jueves,Viernes,S&#xE1;bado".split(","),
		dayNamesShort : "Do,Lu,Ma,Mi,Ju,Vi,S&#xE1;".split(","),
		dayText : "D&#237;a",
		hourText : "Horas",
		minuteText : "Minutos",
		monthNames : "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre".split(","),
		monthNamesShort : "Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic".split(","),
		monthText : "Mes",
		secText : "Segundos",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "A&ntilde;o",
		nowText : "Ahora",
		wholeText : "Entero",
		fractionText : "Fracci\u00f3n",
		unitText : "Unidad",
		labels : "A\u00f1os,Meses,D\u00edas,Horas,Minutos,Segundos,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Iniciar",
		stopText : "Det\u00e9ngase",
		resetText : "Reinicializar",
		lapText : "Lap",
		hideText : "Esconder"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.fr = a.extend(a.mobiscroll.i18n.fr, {
		setText : "Termin\u00e9",
		cancelText : "Annuler",
		dateFormat : "dd/mm/yy",
		dateOrder : "ddmmyy",
		dayNames : "&#68;imanche,Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi".split(","),
		dayNamesShort : "&#68;im.,Lun.,Mar.,Mer.,Jeu.,Ven.,Sam.".split(","),
		dayText : "Jour",
		monthText : "Mois",
		monthNames : "Janvier,F\u00e9vrier,Mars,Avril,Mai,Juin,Juillet,Ao\u00fbt,Septembre,Octobre,Novembre,D\u00e9cembre".split(","),
		monthNamesShort : "Janv.,F\u00e9vr.,Mars,Avril,Mai,Juin,Juil.,Ao\u00fbt,Sept.,Oct.,Nov.,D\u00e9c.".split(","),
		hourText : "Heures",
		minuteText : "Minutes",
		secText : "Secondes",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "Ann\u00e9e",
		nowText : "Maintenant",
		wholeText : "Entier",
		fractionText : "Fraction",
		unitText : "Unit\u00e9",
		labels : "Ans,Mois,Jours,Heures,Minutes,Secondes,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Ind\u00edt",
		stopText : "Meg\u00e1ll\u00edt",
		resetText : "Vissza\u00e1ll\u00edt",
		lapText : "Lap",
		hideText : "Elrejt"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.it = a.extend(a.mobiscroll.i18n.it, {
		setText : "OK",
		cancelText : "Annulla",
		dateFormat : "dd-mm-yyyy",
		dateOrder : "ddmmyy",
		dayNames : "Domenica,Luned&Igrave;,Merted&Igrave;,Mercoled&Igrave;,Gioved&Igrave;,Venerd&Igrave;,Sabato".split(","),
		dayNamesShort : "Do,Lu,Ma,Me,Gi,Ve,Sa".split(","),
		dayText : "Giorno",
		hourText : "Ore",
		minuteText : "Minuti",
		monthNames : "Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre".split(","),
		monthNamesShort : "Gen,Feb,Mar,Apr,Mag,Giu,Lug,Ago,Set,Ott,Nov,Dic".split(","),
		monthText : "Mese",
		secText : "Secondi",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "Anno",
		wholeText : "Intero",
		fractionText : "Frazione",
		unitText : "Unit\u00e0",
		labels : "Anni,Mesi,Giorni,Ore,Minuti,Secondi,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Inizio",
		stopText : "Arresto",
		resetText : "Ripristina",
		lapText : "Lap",
		hideText : "Nascondi"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.no = a.extend(a.mobiscroll.i18n.no, {
		setText : "OK",
		cancelText : "Avbryt",
		dateFormat : "dd.mm.yy",
		dateOrder : "ddmmyy",
		dayNames : "S\u00f8ndag,Mandag,Tirsdag,Onsdag,Torsdag,Fredag,L\u00f8rdag".split(","),
		dayNamesShort : "S\u00f8,Ma,Ti,On,To,Fr,L\u00f8".split(","),
		dayText : "Dag",
		hourText : "Time",
		minuteText : "Minutt",
		monthNames : "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(","),
		monthNamesShort : "Jan,Feb,Mar,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Des".split(","),
		monthText : "M\u00e5ned",
		secText : "Sekund",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "\u00c5r",
		nowText : "N\u00e5",
		wholeText : "Hele",
		fractionText : "Fraksjon",
		unitText : "Unit",
		labels : "\u00c5r,M\u00e5neder,Dager,Timer,Minutter,Sekunder,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Start",
		stopText : "Stopp",
		resetText : "Tilbakestille",
		lapText : "Lap",
		hideText : "Skjul"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n["pt-BR"] = a.extend(a.mobiscroll.i18n["pt-BR"], {
		setText : "Selecionar",
		cancelText : "Cancelar",
		dateFormat : "dd/mm/yy",
		dateOrder : "ddMMyy",
		dayNames : "Domingo,Segunda-feira,Ter\u00e7a-feira,Quarta-feira,Quinta-feira,Sexta-feira,S\u00e1bado".split(","),
		dayNamesShort : "Dom,Seg,Ter,Qua,Qui,Sex,S\u00e1b".split(","),
		dayText : "Dia",
		hourText : "Hora",
		minuteText : "Minutos",
		monthNames : "Janeiro,Fevereiro,Mar\u00e7o,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(","),
		monthNamesShort : "Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez".split(","),
		monthText : "M\u00eas",
		secText : "Segundo",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "Ano",
		wholeText : "Inteiro",
		fractionText : "Fra\u00e7\u00e3o",
		unitText : "Unidade",
		labels : "Anos,Meses,Dias,Horas,Minutos,Segundos,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Come\u00e7ar",
		stopText : "Pare",
		resetText : "Reinicializar",
		lapText : "Lap",
		hideText : "Esconder"
	})
})(jQuery);
(function(a) {
	a.mobiscroll.i18n.zh = a.extend(a.mobiscroll.i18n.zh, {
		setText : "\u786e\u5b9a",
		cancelText : "\u53d6\u6d88",
		dateFormat : "dd/mm/yy",
		dateOrder : "ddmmyy",
		dayNames : "\u5468\u65e5,\u5468\u4e00,\u5468\u4e8c,\u5468\u4e09,\u5468\u56db,\u5468\u4e94,\u5468\u516d".split(","),
		dayNamesShort : "\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),
		dayText : "\u65e5",
		hourText : "\u65f6",
		minuteText : "\u5206",
		monthNames : "1\u6708,2\u6708,3\u6708,4\u6708,5\u6708,6\u6708,7\u6708,8\u6708,9\u6708,10\u6708,11\u6708,12\u6708".split(","),
		monthNamesShort : "\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d,\u5341,\u5341\u4e00,\u5341\u4e8c".split(","),
		monthText : "\u6708",
		secText : "\u79d2",
		timeFormat : "HH:ii",
		timeWheels : "HHii",
		yearText : "\u5e74",
		nowText : "\u5f53\u524d",
		wholeText : "Whole",
		fractionText : "Fraction",
		unitText : "Unit",
		labels : "Years,Months,Days,Hours,Minutes,Seconds,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Start",
		stopText : "Stop",
		resetText : "Reset",
		lapText : "Lap",
		hideText : "Hide"
	})
})(jQuery);
(function(a) {
	var u = a.mobiscroll, k = new Date, m = {
		dateFormat : "mm/dd/yy",
		dateOrder : "mmddy",
		timeWheels : "hhiiA",
		timeFormat : "hh:ii A",
		startYear : k.getFullYear() - 100,
		endYear : k.getFullYear() + 1,
		monthNames : "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
		monthNamesShort : "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
		dayNames : "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
		dayNamesShort : "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
		shortYearCutoff : "+10",
		monthText : "Month",
		dayText : "Day",
		yearText : "Year",
		hourText : "Hours",
		minuteText : "Minutes",
		secText : "Seconds",
		ampmText : "&nbsp;",
		nowText : "Now",
		showNow : !1,
		stepHour : 1,
		stepMinute : 1,
		stepSecond : 1,
		separator : " "
	}, z = function(k) {
		function t(a, b, h) {
			return
			void 0 !== q[b] ? +a[q[b]] :
			void 0 !== h ? h : d[x[b]] ? d[x[b]]() : x[b](d)
		}

		function j(a, b) {
			return Math.floor(a / b) * b
		}

		function l(a) {
			var b = t(a, "h", 0);
			return new Date(t(a, "y"), t(a, "m"), t(a, "d", 1), t(a, "a") ? b + 12 : b, t(a, "i", 0), t(a, "s", 0))
		}

		var g = a(this), z = {}, p;
		if (g.is("input")) {
			switch(g.attr("type")) {
				case "date":
					p = "yy-mm-dd";
					break;
				case "datetime":
					p = "yy-mm-ddTHH:ii:ssZ";
					break;
				case "datetime-local":
					p = "yy-mm-ddTHH:ii:ss";
					break;
				case "month":
					p = "yy-mm";
					z.dateOrder = "mmyy";
					break;
				case "time":
					p = "HH:ii:ss"
			}
			var c = g.attr("min"), g = g.attr("max");
			c && (z.minDate = u.parseDate(p, c));
			g && (z.maxDate = u.parseDate(p, g))
		}
		var e = a.extend({}, m, z, k.settings), r = 0, z = [], w = [], q = {}, f, x = {
			y : "getFullYear",
			m : "getMonth",
			d : "getDate",
			h : function(a) {
				a = a.getHours();
				a = E && 12 <= a ? a - 12 : a;
				return j(a, b)
			},
			i : function(a) {
				return j(a.getMinutes(), h)
			},
			s : function(a) {
				return j(a.getSeconds(), s)
			},
			a : function(a) {
				return L && 11 < a.getHours() ? 1 : 0
			}
		}, A = e.preset, C = e.dateOrder, v = e.timeWheels, y = C.match(/D/), L = v.match(/a/i), E = v.match(/h/), F = "datetime" == A ? e.dateFormat + e.separator + e.timeFormat : "time" == A ? e.timeFormat : e.dateFormat, d = new Date, b = e.stepHour, h = e.stepMinute, s = e.stepSecond, H = e.minDate || new Date(e.startYear, 0, 1), M = e.maxDate || new Date(e.endYear, 11, 31, 23, 59, 59);
		k.settings = e;
		p = p || F;
		if (A.match(/date/i)) {
			a.each(["y", "m", "d"], function(a, b) {
				f = C.search(RegExp(b, "i"));
				-1 < f && w.push({
					o : f,
					v : b
				})
			});
			w.sort(function(a, b) {
				return a.o > b.o ? 1 : -1
			});
			a.each(w, function(a, b) {
				q[b.v] = a
			});
			g = {};
			for ( c = 0; 3 > c; c++)
				if (c == q.y) {
					r++;
					g[e.yearText] = {};
					var K = H.getFullYear(), Z = M.getFullYear();
					for ( f = K; f <= Z; f++)
						g[e.yearText][f] = C.match(/yy/i) ? f : (f + "").substr(2, 2)
				} else if (c == q.m) {
					r++;
					g[e.monthText] = {};
					for ( f = 0; 12 > f; f++)
						K = C.replace(/[dy]/gi, "").replace(/mm/, 9 > f ? "0" + (f + 1) : f + 1).replace(/m/, f + 1), g[e.monthText][f] = K.match(/MM/) ? K.replace(/MM/, '<span class="dw-mon">' + e.monthNames[f] + "</span>") : K.replace(/M/, '<span class="dw-mon">' + e.monthNamesShort[f] + "</span>")
				} else if (c == q.d) {
					r++;
					g[e.dayText] = {};
					for ( f = 1; 32 > f; f++)
						g[e.dayText][f] = C.match(/dd/i) && 10 > f ? "0" + f : f
				}
			z.push(g)
		}
		if (A.match(/time/i)) {
			w = [];
			a.each(["h", "i", "s", "a"], function(a, b) {
				a = v.search(RegExp(b, "i"));
				-1 < a && w.push({
					o : a,
					v : b
				})
			});
			w.sort(function(a, b) {
				return a.o > b.o ? 1 : -1
			});
			a.each(w, function(a, b) {
				q[b.v] = r + a
			});
			g = {};
			for ( c = r; c < r + 4; c++)
				if (c == q.h) {
					r++;
					g[e.hourText] = {};
					for ( f = 0; f < ( E ? 12 : 24); f += b)
						g[e.hourText][f] = E && 0 == f ? 12 : v.match(/hh/i) && 10 > f ? "0" + f : f
				} else if (c == q.i) {
					r++;
					g[e.minuteText] = {};
					for ( f = 0; 60 > f; f += h)
						g[e.minuteText][f] = v.match(/ii/) && 10 > f ? "0" + f : f
				} else if (c == q.s) {
					r++;
					g[e.secText] = {};
					for ( f = 0; 60 > f; f += s)
						g[e.secText][f] = v.match(/ss/) && 10 > f ? "0" + f : f
				} else
					c == q.a && (r++, A = v.match(/A/), g[e.ampmText] = {
						"0" : A ? "AM" : "am",
						1 : A ? "PM" : "pm"
					});
			z.push(g)
		}
		k.setDate = function(a, b, d, h) {
			for (var c in q)
			this.temp[q[c]] = a[x[c]] ? a[x[c]]() : x[c](a);
			this.setValue(!0, b, d, h)
		};
		k.getDate = function(a) {
			return l(a)
		};
		return {
			button3Text : e.showNow ? e.nowText :
			void 0,
			button3 : e.showNow ? function() {
				k.setDate(new Date, !1, 0.3, !0)
			} :
			void 0,
			wheels : z,
			headerText : function() {
				return u.formatDate(F, l(k.temp), e)
			},
			formatResult : function(a) {
				return u.formatDate(p, l(a), e)
			},
			parseValue : function(a) {
				var b = new Date, d, h = [];
				try {
					b = u.parseDate(p, a, e)
				} catch(c) {
				}
				for (d in q)
				h[q[d]] = b[x[d]] ? b[x[d]]() : x[d](b);
				return h
			},
			validate : function(d) {
				var c = k.temp, g = {
					y : H.getFullYear(),
					m : 0,
					d : 1,
					h : 0,
					i : 0,
					s : 0,
					a : 0
				}, f = {
					y : M.getFullYear(),
					m : 11,
					d : 31,
					h : j( E ? 11 : 23, b),
					i : j(59, h),
					s : j(59, s),
					a : 1
				}, i = !0, l = !0;
				a.each("y,m,d,a,h,i,s".split(","), function(b, h) {
					if (q[h] !==
					void 0) {
						var s = g[h], j = f[h], k = 31, p = t(c, h), F = a(".dw-ul", d).eq(q[h]), r, m;
						if (h == "d") {
							r = t(c, "y");
							m = t(c, "m");
							j = k = 32 - (new Date(r, m, 32)).getDate();
							y && a(".dw-li", F).each(function() {
								var b = a(this), d = b.data("val"), h = (new Date(r, m, d)).getDay(), d = C.replace(/[my]/gi, "").replace(/dd/, d < 10 ? "0" + d : d).replace(/d/, d);
								a(".dw-i", b).html(d.match(/DD/) ? d.replace(/DD/, '<span class="dw-day">' + e.dayNames[h] + "</span>") : d.replace(/D/, '<span class="dw-day">' + e.dayNamesShort[h] + "</span>"))
							})
						}
						i && H && ( s = H[x[h]] ? H[x[h]]() : x[h](H));
						l && M && ( j = M[x[h]] ? M[x[h]]() : x[h](M));
						if (h != "y") {
							var z = a(".dw-li", F).index(a('.dw-li[data-val="' + s + '"]', F)), K = a(".dw-li", F).index(a('.dw-li[data-val="' + j + '"]', F));
							a(".dw-li", F).removeClass("dw-v").slice(z, K + 1).addClass("dw-v");
							h == "d" && a(".dw-li", F).removeClass("dw-h").slice(k).addClass("dw-h")
						}
						p < s && ( p = s);
						p > j && ( p = j);
						i && ( i = p == s);
						l && ( l = p == j);
						if (e.invalid && h == "d") {
							var w = [];
							e.invalid.dates && a.each(e.invalid.dates, function(a, b) {
								b.getFullYear() == r && b.getMonth() == m && w.push(b.getDate() - 1)
							});
							if (e.invalid.daysOfWeek) {
								var u = (new Date(r, m, 1)).getDay(), v;
								a.each(e.invalid.daysOfWeek, function(a, b) {
									for ( v = b - u; v < k; v = v + 7)
										v >= 0 && w.push(v)
								})
							}
							e.invalid.daysOfMonth && a.each(e.invalid.daysOfMonth, function(a, b) {
								b = (b + "").split("/");
								b[1] ? b[0] - 1 == m && w.push(b[1] - 1) : w.push(b[0] - 1)
							});
							a.each(w, function(b, d) {
								a(".dw-li", F).eq(d).removeClass("dw-v")
							})
						}
						c[q[h]] = p
					}
				})
			},
			methods : {
				getDate : function(b) {
					var d = a(this).mobiscroll("getInst");
					if (d)
						return d.getDate( b ? d.temp : d.values)
				},
				setDate : function(b, d, h, c) {
					return this.each(function() {
						var s = a(this).mobiscroll("getInst");
						s && s.setDate(b, d, h, c)
					})
				}
			}
		}
	};
	a.each(["date", "time", "datetime"], function(a, k) {
		u.presets[k] = z;
		u.presetShort(k)
	});
	u.formatDate = function(k, t, j) {
		if (!t)
			return null;
		var j = a.extend({}, m, j), l = function(a) {
			for (var c = 0; p + 1 < k.length && k.charAt(p + 1) == a; )
				c++, p++;
			return c
		}, g = function(a, c, g) {
			c = "" + c;
			if (l(a))
				for (; c.length < g; )
					c = "0" + c;
			return c
		}, z = function(a, c, g, e) {
			return l(a) ? e[c] : g[c]
		}, p, c = "", e = !1;
		for ( p = 0; p < k.length; p++)
			if (e)
				"'" == k.charAt(p) && !l("'") ? e = !1 : c += k.charAt(p);
			else
				switch(k.charAt(p)) {
					case "d":
						c += g("d", t.getDate(), 2);
						break;
					case "D":
						c += z("D", t.getDay(), j.dayNamesShort, j.dayNames);
						break;
					case "o":
						c += g("o", (t.getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
						break;
					case "m":
						c += g("m", t.getMonth() + 1, 2);
						break;
					case "M":
						c += z("M", t.getMonth(), j.monthNamesShort, j.monthNames);
						break;
					case "y":
						c += l("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
						break;
					case "h":
						var r = t.getHours(), c = c + g("h", 12 < r ? r - 12 : 0 == r ? 12 : r, 2);
						break;
					case "H":
						c += g("H", t.getHours(), 2);
						break;
					case "i":
						c += g("i", t.getMinutes(), 2);
						break;
					case "s":
						c += g("s", t.getSeconds(), 2);
						break;
					case "a":
						c += 11 < t.getHours() ? "pm" : "am";
						break;
					case "A":
						c += 11 < t.getHours() ? "PM" : "AM";
						break;
					case "'":
						l("'") ? c += "'" : e = !0;
						break;
					default:
						c += k.charAt(p)
				}
		return c
	};
	u.parseDate = function(k, t, j) {
		var l = new Date;
		if (!k || !t)
			return l;
		var t = "object" == typeof t ? t.toString() : t + "", g = a.extend({}, m, j), z = g.shortYearCutoff, j = l.getFullYear(), p = l.getMonth() + 1, c = l.getDate(), e = -1, r = l.getHours(), l = l.getMinutes(), u = 0, q = -1, f = !1, x = function(a) {
			( a = y + 1 < k.length && k.charAt(y + 1) == a) && y++;
			return a
		}, A = function(a) {
			x(a);
			a = t.substr(v).match(RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 : "y" == a ? 4 : "o" == a ? 3 : 2) + "}"));
			if (!a)
				return 0;
			v += a[0].length;
			return parseInt(a[0], 10)
		}, C = function(a, c, g) {
			a = x(a) ? g : c;
			for ( c = 0; c < a.length; c++)
				if (t.substr(v, a[c].length).toLowerCase() == a[c].toLowerCase())
					return v += a[c].length, c + 1;
			return 0
		}, v = 0, y;
		for ( y = 0; y < k.length; y++)
			if (f)
				"'" == k.charAt(y) && !x("'") ? f = !1 : v++;
			else
				switch(k.charAt(y)) {
					case "d":
						c = A("d");
						break;
					case "D":
						C("D", g.dayNamesShort, g.dayNames);
						break;
					case "o":
						e = A("o");
						break;
					case "m":
						p = A("m");
						break;
					case "M":
						p = C("M", g.monthNamesShort, g.monthNames);
						break;
					case "y":
						j = A("y");
						break;
					case "H":
						r = A("H");
						break;
					case "h":
						r = A("h");
						break;
					case "i":
						l = A("i");
						break;
					case "s":
						u = A("s");
						break;
					case "a":
						q = C("a", ["am", "pm"], ["am", "pm"]) - 1;
						break;
					case "A":
						q = C("A", ["am", "pm"], ["am", "pm"]) - 1;
						break;
					case "'":
						x("'") ? v++ : f = !0;
						break;
					default:
						v++
				}
		100 > j && (j += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j <= ("string" != typeof z ? z : (new Date).getFullYear() % 100 + parseInt(z, 10)) ? 0 : -100));
		if (-1 < e) {
			p = 1;
			c = e;
			do {
				g = 32 - (new Date(j, p - 1, 32)).getDate();
				if (c <= g)
					break;
				p++;
				c -= g
			} while(1)
		}
		r = new Date(j, p - 1, c, -1 == q ? r : q && 12 > r ? r + 12 : !q && 12 == r ? 0 : r, l, u);
		if (r.getFullYear() != j || r.getMonth() + 1 != p || r.getDate() != c)
			throw "Invalid date";
		return r
	}
})(jQuery);
(function(a) {
	var u = a.mobiscroll, k = {
		invalid : [],
		showInput : !0,
		inputClass : ""
	}, m = function(m) {
		function u(c, d, b, h) {
			for (var s = 0; s < d; ) {
				var g = a(".dwwl" + s, c), e = t(h, s, b);
				a.each(e, function(b, d) {
					a('.dw-li[data-val="' + d + '"]', g).removeClass("dw-v")
				});
				s++
			}
		}

		function t(a, d, b) {
			for (var h = 0, c, g = []; h < d; ) {
				var e = a[h];
				for (c in b)
				if (b[c].key == e) {
					b = b[c].children;
					break
				}
				h++
			}
			for ( h = 0; h < b.length; )
				b[h].invalid && g.push(b[h].key), h++;
			return g
		}

		function j(a, d) {
			for (var b = []; a; )
				b[--a] = !0;
			b[d] = !1;
			return b
		}

		function l(a, d, b) {
			var h = 0, c, e, f = [{}], k = v;
			if (d)
				for ( c = 0; c < d; c++)
					f[c] = {}, f[c][y[c]] = {};
			for (; h < a.length; ) {
				f[h] = {};
				c = f[h];
				for (var d = y[h], j = k, l = {}, m = 0; m < j.length; )
					l[j[m].key] = j[m++].value;
				c[d] = l;
				c = 0;
				for ( d =
				void 0; c < k.length &&
				void 0 === d; ) {
					if (k[c].key == a[h] && (
						void 0 !== b && h <= b ||
						void 0 === b))
						d = c;
					c++
				}
				if (
					void 0 !== d && k[d].children)
					h++, k = k[d].children;
				else if (( e = g(k)) && e.children)
					h++, k = e.children;
				else
					break
			}
			return f
		}

		function g(a, d) {
			if (!a)
				return !1;
			for (var b = 0, c; b < a.length; )
				if (!( c = a[b++]).invalid)
					return d ? b - 1 : c;
			return !1
		}

		function I(c, d) {
			a(".dwc", c).css("display", "").slice(d).hide()
		}

		function p(a, d) {
			var b = [], c = v, e = 0, f = !1, k, j;
			if (
			void 0 !== a[e] && e <= d) {
				f = 0;
				k = a[e];
				for ( j =
				void 0; f < c.length &&
				void 0 === j; )
					c[f].key == a[e] && !c[f].invalid && ( j = f), f++
			} else
				j = g(c, !0), k = c[j].key;
			f =
			void 0 !== j ? c[j].children : !1;
			for (b[e] = k; f; ) {
				c = c[j].children;
				e++;
				if (
				void 0 !== a[e] && e <= d) {
					f = 0;
					k = a[e];
					for ( j =
					void 0; f < c.length &&
					void 0 === j; )
						c[f].key == a[e] && !c[f].invalid && ( j = f), f++
				} else
					j = g(c, !0), j = !1 === j ?
					void 0 : j, k = c[j].key;
				f =
				void 0 !== j && g(c[j].children) ? c[j].children : !1;
				b[e] = k
			}
			return {
				lvl : e + 1,
				nVector : b
			}
		}

		function c(e) {
			var d = [];
			x = x > A++ ? x : A;
			e.children("li").each(function(b) {
				var h = a(this), e = h.clone();
				e.children("ul,ol").remove();
				var e = e.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""), g = h.data("invalid") ? !0 : !1, b = {
					key : h.data("val") || b,
					value : e,
					invalid : g,
					children : null
				}, h = h.children("ul,ol");
				h.length && (b.children = c(h));
				d.push(b)
			});
			A--;
			return d
		}

		var e = a.extend({}, k, m.settings), r = a(this), w, q, f = this.id + "_dummy", x = 0, A = 0, C = {}, v = e.wheelArray || c(r), y = function(a) {
			var d = [], b;
			for ( b = 0; b < a; b++)
				d[b] = e.labels && e.labels[b] ? e.labels[b] : b;
			return d
		}(x), L = [], E = function(a) {
			for (var d = [], b, c = !0, e = 0; c; )
				if ( b = g(a), d[e++] = b.key, c = b.children)
					a = b.children;
			return d
		}(v), E = l(E, x);
		a("#" + f).remove();
		e.showInput && ( w = a('<input type="text" id="' + f + '" value="" class="' + e.inputClass + '" readonly />').insertBefore(r), m.settings.anchor = w, e.showOnFocus && w.focus(function() {
			m.show()
		}));
		e.wheelArray || r.hide().closest(".ui-field-contain").trigger("create");
		return {
			width : 50,
			wheels : E,
			headerText : !1,
			onBeforeShow : function() {
				var a = m.temp;
				L = a.slice(0);
				m.settings.wheels = l(a, x, x);
				q = true
			},
			onSelect : function(a) {
				w && w.val(a)
			},
			onChange : function(a) {
				w && e.display == "inline" && w.val(a)
			},
			onClose : function() {
				w && w.blur()
			},
			onShow : function(c) {
				a(".dwwl", c).bind("mousedown touchstart", function() {
					clearTimeout(C[a(".dwwl", c).index(this)])
				})
			},
			validate : function(a, d, b) {
				var c = m.temp;
				if (d !==
				void 0 && L[d] != c[d] || d ===
				void 0 && !q) {
					m.settings.wheels = l(c, null, d);
					var e = [], g = (d || 0) + 1, f = p(c, d);
					if (d !==
						void 0)
						m.temp = f.nVector.slice(0);
					for (; g < f.lvl; )
						e.push(g++);
					I(a, f.lvl);
					L = m.temp.slice(0);
					if (e.length) {
						q = true;
						m.settings.readonly = j(x, d);
						clearTimeout(C[d]);
						C[d] = setTimeout(function() {
							m.changeWheel(e);
							m.settings.readonly = false
						}, b * 1E3);
						return false
					}
					u(a, f.lvl, v, m.temp)
				} else {
					f = p(c, c.length);
					u(a, f.lvl, v, c);
					I(a, f.lvl)
				}
				q = false
			}
		}
	};
	a.each(["list", "image", "treelist"], function(a, k) {
		u.presets[k] = m;
		u.presetShort(k)
	})
})(jQuery);
(function(a) {
	var u = {
		inputClass : "",
		invalid : [],
		rtl : !1,
		group : !1,
		groupLabel : "Groups"
	};
	a.mobiscroll.presetShort("select");
	a.mobiscroll.presets.select = function(k) {
		function m(a) {
			return a ? a.replace(/_/, "") : ""
		}

		function z() {
			var d, b = 0, e = {}, g = [{}];
			j.group ? (j.rtl && ( b = 1), a("optgroup", l).each(function(b) {
				e["_" + b] = a(this).attr("label")
			}), g[b] = {}, g[b][j.groupLabel] = e, d = c, b += j.rtl ? -1 : 1) : d = l;
			g[b] = {};
			g[b][f] = {};
			a("option", d).each(function() {
				var c = a(this).attr("value");
				g[b][f]["_" + c] = a(this).text();
				a(this).prop("disabled") && x.push(c)
			});
			return g
		}

		function O(a, b) {
			var c = [];
			if (g) {
				var e = [], f = 0;
				for (f in k._selectedValues)e.push(C[f]), c.push(f);
				E.val(e.join(", "))
			} else
				E.val(a), c = b ? m(k.values[y]) : null;
			b && ( w = !0, l.val(c).trigger("change"))
		}

		var t = k.settings, j = a.extend({}, u, t), l = a(this), g = l.prop("multiple"), I = this.id + "_dummy", p = g ? l.val() ? l.val()[0] : a("option", l).attr("value") : l.val(), c = l.find('option[value="' + p + '"]').parent(), e = c.index() + "", r = e, w;
		a('label[for="' + this.id + '"]').attr("for", I);
		var q = a('label[for="' + I + '"]'), f =
		void 0 !== j.label ? j.label : q.length ? q.text() : l.attr("name"), x = [], A = [], C = {}, v, y, L, E, F = t.readonly;
		j.group && !a("optgroup", l).length && (j.group = !1);
		j.invalid.length || (j.invalid = x);
		j.group ? j.rtl ? ( v = 1, y = 0) : ( v = 0, y = 1) : ( v = -1, y = 0);
		a("#" + I).remove();
		E = a('<input type="text" id="' + I + '" class="' + j.inputClass + '" readonly />').insertBefore(l);
		a("option", l).each(function() {
			C[a(this).attr("value")] = a(this).text()
		});
		j.showOnFocus && E.focus(function() {
			k.show()
		});
		I = l.val() || [];
		q = 0;
		for (q; q < I.length; q++)
			k._selectedValues[I[q]] = I[q];
		O(C[p]);
		l.unbind(".dwsel").bind("change.dwsel", function() {
			w || k.setSelectVal( g ? l.val() || [] : [l.val()], true);
			w = false
		}).hide().closest(".ui-field-contain").trigger("create");
		k.setSelectVal = function(d, b, h) {
			p = d[0] || a("option", l).attr("value");
			if (g) {
				k._selectedValues = {};
				var f = 0;
				for (f; f < d.length; f++)
					k._selectedValues[d[f]] = d[f]
			}
			if (j.group) {
				c = l.find('option[value="' + p + '"]').parent();
				r = c.index();
				k.temp = j.rtl ? ["_" + p, "_" + c.index()] : ["_" + c.index(), "_" + p];
				if (r !== e) {
					t.wheels = z();
					k.changeWheel([y]);
					e = r + ""
				}
			} else
				k.temp = ["_" + p];
			k.setValue(true, b, h);
			if (b) {
				d = g ? true : p !== l.val();
				O(C[p], d)
			}
		};
		k.getSelectVal = function(a) {
			return m((a?k.temp:k.values)[y])
		};
		return {
			width : 50,
			wheels :
			void 0,
			headerText : !1,
			multiple : g,
			anchor : E,
			formatResult : function(a) {
				return C[m(a[y])]
			},
			parseValue : function() {
				var d = l.val() || [], b = 0;
				if (g) {
					k._selectedValues = {};
					for (b; b < d.length; b++)
						k._selectedValues[d[b]] = d[b]
				}
				p = g ? l.val() ? l.val()[0] : a("option", l).attr("value") : l.val();
				c = l.find('option[value="' + p + '"]').parent();
				r = c.index();
				e = r + "";
				return j.group && j.rtl ? ["_" + p, "_" + r] : j.group ? ["_" + r, "_" + p] : ["_" + p]
			},
			validate : function(d, b, f) {
				if (b ===
				void 0 && g) {
					var s = k._selectedValues, q = 0;
					for (q in s)
					a(".dwwl" + y + ' .dw-li[data-val="_' + s[q] + '"]', d).addClass("dw-msel")
				}
				if (b === v) {
					r = m(k.temp[v]);
					if (r !== e) {
						c = l.find("optgroup").eq(r);
						r = c.index();
						p = ( p = c.find("option").eq(0).val()) || l.val();
						t.wheels = z();
						if (j.group) {
							k.temp = j.rtl ? ["_" + p, "_" + r] : ["_" + r, "_" + p];
							t.readonly = [j.rtl, !j.rtl];
							clearTimeout(L);
							L = setTimeout(function() {
								k.changeWheel([y]);
								t.readonly = F;
								e = r + ""
							}, f * 1E3);
							return false
						}
					} else
						t.readonly = F
				} else
					p = m(k.temp[y]);
				var u = a(".dw-ul", d).eq(y);
				a.each(j.invalid, function(b, c) {
					a('.dw-li[data-val="_' + c + '"]', u).removeClass("dw-v")
				})
			},
			onBeforeShow : function() {
				t.wheels = z();
				if (j.group)
					k.temp = j.rtl ? ["_" + p, "_" + c.index()] : ["_" + c.index(), "_" + p]
			},
			onMarkupReady : function(c) {
				a(".dwwl" + v, c).bind("mousedown touchstart", function() {
					clearTimeout(L)
				});
				if (g) {
					c.addClass("dwms");
					a(".dwwl", c).eq(y).addClass("dwwms");
					A = {};
					for (var b in k._selectedValues)
					A[b] = k._selectedValues[b]
				}
			},
			onValueTap : function(a) {
				if (g && a.hasClass("dw-v") && a.closest(".dw").find(".dw-ul").index(a.closest(".dw-ul")) == y) {
					var b = m(a.attr("data-val"));
					a.hasClass("dw-msel") ?
					delete k._selectedValues[b] : k._selectedValues[b] = b;
					a.toggleClass("dw-msel");
					j.display == "inline" && O(b, true);
					return false
				}
			},
			onSelect : function(a) {
				O(a, true);
				if (j.group)
					k.values = null
			},
			onCancel : function() {
				if (j.group)
					k.values = null;
				if (g) {
					k._selectedValues = {};
					for (var a in A)
					k._selectedValues[a] = A[a]
				}
			},
			onChange : function(a) {
				if (j.display == "inline" && !g) {
					E.val(a);
					w = true;
					l.val(m(k.temp[y])).trigger("change")
				}
			},
			onClose : function() {
				E.blur()
			},
			methods : {
				setValue : function(c, b, e) {
					return this.each(function() {
						var f = a(this).mobiscroll("getInst");
						if (f)
							if (f.setSelectVal)
								f.setSelectVal(c, b, e);
							else {
								f.temp = c;
								f.setValue(true, b, e)
							}
					})
				},
				getValue : function(c) {
					var b = a(this).mobiscroll("getInst");
					if (b)
						return b.getSelectVal ? b.getSelectVal(c) : b.values
				}
			}
		}
	}
})(jQuery);
(function(a) {
	a.mobiscroll.themes.android = {
		defaults : {
			dateOrder : "Mddyy",
			mode : "clickpick",
			height : 50,
			showLabel : !1
		}
	}
})(jQuery);
(function(a) {
	var u = {
		defaults : {
			dateOrder : "Mddyy",
			mode : "mixed",
			rows : 5,
			width : 70,
			height : 36,
			showLabel : !1,
			useShortLabels : !0
		}
	};
	a.mobiscroll.themes["android-ics"] = u;
	a.mobiscroll.themes["android-ics light"] = u
})(jQuery);
(function(a) {
	a.mobiscroll.themes.ios = {
		defaults : {
			dateOrder : "MMdyy",
			rows : 5,
			height : 30,
			width : 55,
			headerText : !1,
			showLabel : !1,
			useShortLabels : !0
		}
	}
})(jQuery);
(function(a) {
	a.mobiscroll.themes.jqm = {
		defaults : {
			jqmBorder : "a",
			jqmBody : "c",
			jqmHeader : "b",
			jqmWheel : "d",
			jqmClickPick : "c",
			jqmSet : "b",
			jqmCancel : "c"
		},
		init : function(u, k) {
			var m = k.settings;
			a(".dw", u).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-" + m.jqmBorder);
			a(".dwb-s span", u).attr("data-role", "button").attr("data-theme", m.jqmSet);
			a(".dwb-n span", u).attr("data-role", "button").attr("data-theme", m.jqmCancel);
			a(".dwb-c span", u).attr("data-role", "button").attr("data-theme", m.jqmCancel);
			a(".dwwb", u).attr("data-role", "button").attr("data-theme", m.jqmClickPick);
			a(".dwv", u).addClass("ui-header ui-bar-" + m.jqmHeader);
			a(".dwwr", u).addClass("ui-body-" + m.jqmBody);
			a(".dwpm .dwwl", u).addClass("ui-body-" + m.jqmWheel);
			a(".dwpm .dwl", u).addClass("ui-body-" + m.jqmBody);
			u.trigger("create");
			a(".dwo", u).click(function() {
				k.cancel()
			})
		}
	}
})(jQuery);
(function(a) {
	var u;
	a.mobiscroll.themes.wp = {
		defaults : {
			width : 70,
			height : 76,
			accent : "none",
			dateOrder : "mmMMddDDyy",
			showLabel : !1,
			onAnimStart : function(k, m, z) {
				a(".dwwl" + m, k).addClass("wpam");
				clearTimeout(u[m]);
				u[m] = setTimeout(function() {
					a(".dwwl" + m, k).removeClass("wpam")
				}, 1E3 * z + 100)
			}
		},
		init : function(k, m) {
			var z, O;
			u = {};
			a(".dw", k).addClass("wp-" + m.settings.accent);
			a(".dwwl", k).delegate(".dw-sel", "touchstart mousedown DOMMouseScroll mousewheel", function() {
				z = !0;
				O = a(this).closest(".dwwl").hasClass("wpa");
				a(".dwwl", k).removeClass("wpa");
				a(this).closest(".dwwl").addClass("wpa")
			}).bind("touchmove mousemove", function() {
				z = !1
			}).bind("touchend mouseup", function() {
				z && O && a(this).closest(".dwwl").removeClass("wpa")
			})
		}
	};
	a.mobiscroll.themes["wp light"] = a.mobiscroll.themes.wp
})(jQuery);

(function(a) {
	function t(b) {
		var d = [b.r.toString(16), b.g.toString(16), b.b.toString(16)];
		a.each(d, function(a, b) {
			1 == b.length && (d[a] = "0" + b)
		});
		return "#" + d.join("")
	}

	function b(a) {
		a = parseInt(-1 < a.indexOf("#") ? a.substring(1) : a, 16);
		return {
			r : a >> 16,
			g : (a & 65280) >> 8,
			b : a & 255
		}
	}

	function g(a) {
		var b, d, f;
		b = Math.round(a.h);
		var e = Math.round(255 * a.s / 100), a = Math.round(255 * a.v / 100);
		if (0 == e)
			b = d = f = a;
		else {
			var e = (255 - e) * a / 255, g = (a - e) * (b % 60) / 60;
			360 == b && ( b = 0);
			60 > b ? ( b = a, f = e, d = e + g) : 120 > b ? ( d = a, f = e, b = a - g) : 180 > b ? ( d = a, b = e, f = e + g) : 240 > b ? ( f = a, b = e, d = a - g) : 300 > b ? ( f = a, d = e, b = e + g) : 360 > b ? ( b = a, d = e, f = a - g) : b = d = f = 0
		}
		return {
			r : Math.round(b),
			g : Math.round(d),
			b : Math.round(f)
		}
	}

	function d(a) {
		var b = 0, d;
		d = Math.min(a.r, a.g, a.b);
		var f = Math.max(a.r, a.g, a.b), b = f - d, b = ( d = f ? 255 * b / f : 0) ? a.r == f ? (a.g - a.b) / b : a.g == f ? 2 + (a.b - a.r) / b : 4 + (a.r - a.g) / b : -1, b = 60 * b;
		0 > b && (b += 360);
		d *= 100 / 255;
		a = f * (100 / 255);
		return {
			h : Math.round(b),
			s : Math.round(d),
			v : Math.round(a)
		}
	}

	function n(a) {
		return t(g(a))
	}

	function r(a) {
		return d(b(a))
	}

	var o = a.mobiscroll, i = {
		preview : !0,
		previewText : !0,
		label : "Color",
		format : "hex",
		hueText : "Hue",
		saturationText : "Saturation",
		valueText : "Value"
	};
	o.presetShort("colorpicker");
	o.presets.colorpicker = function(b) {
		function k(a) {
			return isNaN(+a) ? 0 : +a
		}

		function x(a) {
			return "hsv" == p ? a.join(",") : "rgb" == p ? ( a = g({
				h : a[0],
				s : a[1],
				v : a[2]
			}), a.r + "," + a.g + "," + a.b) : n({
				h : a[0],
				s : a[1],
				v : a[2]
			})
		}

		function f(a, b, d) {
			a[0].style.backgroundImage = c + ("-webkit" == c ? "-gradient(linear,left top,left bottom,from(" + b + "),to(" + d + "))" : "-linear-gradient(" + b + "," + d + ")")
		}

		function e(c, d) {
			var e = b.temp;
			1 !== d && 2 !== d && f(a(".dwwl1 .dw-ul", c), n({
				h : e[0],
				s : 0,
				v : 100
			}), n({
				h : e[0],
				s : 100,
				v : 100
			}));
			2 !== d && f(a(".dwwl2 .dw-ul", c), n({
				h : e[0],
				s : e[1],
				v : 0
			}), n({
				h : e[0],
				s : e[1],
				v : 100
			}));
			if (s) {
				var h = g({
					h : e[0],
					s : e[1],
					v : e[2]
				}), h = 0.299 * h.r + 0.587 * h.g + 0.114 * h.b;
				a(".dw-color-preview", c).attr("style", "background:" + n({
					h : e[0],
					s : e[1],
					v : e[2]
				}) + ";color:" + (130 < h ? "#000" : "#fff")).text( R ? x(e) : "")
			}
		}

		var o = document.createElement("modernizr").style, c = function() {
			var a = ["Webkit", "Moz", "O", "ms"], b;
			for (b in a) {
				var c;
				a: {
					c = [a[b] + "Transform"];
					var d =
					void 0;
					for (d in c)
					if (
					void 0 !== o[c[d]]) {
						c = !0;
						break a
					}
					c = !1
				}
				if (c)
					return "-" + a[b].toLowerCase()
			}
			return ""
		}(), h = a.extend({}, i, b.settings), p = h.format, s = h.preview, R = h.previewText, A = h.layout, G = h.hueText, D = h.saturationText, t = h.valueText, h = [{}], h = function() {
			var a = [{}], b = 0;
			a[0][G] = {};
			a[0][D] = {};
			a[0][t] = {};
			for (b; 360 > b; b += 3)
				a[0][G][b] = '<div class="dw-color" style="background:' + n({
					h : b,
					s : 100,
					v : 100
				}) + '"><div class="dw-color-hl"></div></div>';
			for ( b = 0; 101 > b; b += 1)
				a[0][D][b] = '<div class="dw-color"><div class="dw-color-hl"></div></div>', a[0][t][b] = '<div class="dw-color"><div class="dw-color-hl"></div></div>';
			return a
		}(0, 100, 100);
		return {
			wheels : h,
			width : 70,
			height : 12,
			rows : 13,
			speedUnit : 0.0060,
			timeUnit : 0.05,
			showLabel : !0,
			parseValue : function(a) {
				return a ? ("hsv" == p ? ( a = a.split(","), a = {
					h : k(a[0]),
					s : k(a[1]),
					v : k(a[2])
				}) : "rgb" == p ? ( a = a.split(","), a = d({
					r : k(a[0]),
					g : k(a[1]),
					b : k(a[2])
				})) : ( a = a.replace("#", ""), 3 == a.length && ( a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), a = r(a)), [3 * Math.floor(a.h / 3), a.s, a.v]) : [0, 100, 100]
			},
			formatResult : x,
			onBeforeShow : function() {
				b.settings.mode = "scroller";
				s && (b.settings.headerText = !1)
			},
			onMarkupReady : function(a) {
				a.addClass("dw-colorpicker");
				s && a.find(".dwc").before('<div class="dw-color-preview"></div>');
				"liquid" == A && a.addClass("dw-colorpicker-liq");
				e(a)
			},
			validate : function(a, b) {
				setTimeout(function() {
					e(a, b)
				}, 1)
			}
		}
	};
	o.colorpicker = {
		hsv2hex : n,
		hsv2rgb : g,
		rgb2hsv : d,
		rgb2hex : t,
		hex2rgb : b,
		hex2hsv : r
	}
})(jQuery);
(function(a) {
	var t = {
		controls : ["start", "reset"],
		autostart : !1,
		step : 1,
		useShortLabels : !1,
		labels : "Years,Months,Days,Hours,Minutes,Seconds,".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
		startText : "Start",
		stopText : "Stop",
		resetText : "Reset",
		lapText : "Lap",
		hideText : "Hide"
	};
	a.mobiscroll.presetShort("timer");
	a.mobiscroll.presets.timer = function(b) {
		function g(a) {
			return new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds())
		}

		function d(b) {
			var c = {};
			if (u && v[I].index > v.days.index) {
				var d, j, Q, f;
				d = new Date;
				var e = p ? d : C;
				d = p ? C : d;
				d = g(d);
				e = g(e);
				c.years = e.getFullYear() - d.getFullYear();
				c.months = e.getMonth() - d.getMonth();
				c.days = e.getDate() - d.getDate();
				c.hours = e.getHours() - d.getHours();
				c.minutes = e.getMinutes() - d.getMinutes();
				c.seconds = e.getSeconds() - d.getSeconds();
				c.fract = (e.getMilliseconds() - d.getMilliseconds()) / 10;
				for ( d = z.length; 0 < d; d--)
					j = z[d - 1], Q = v[j], f = z[a.inArray(j, z) - 1], v[f] && 0 > c[j] && (c[f]--, c[j] += "months" == f ? 32 - (new Date(e.getFullYear(), e.getMonth(), 32)).getDate() : Q.until + 1);
				"months" == I && (c.months += 12 * c.years,
				delete c.years)
			} else
				a(z).each(function(a, d) {
					v[d].index <= v[I].index && (c[d] = Math.floor(b / v[d].limit), b -= c[d] * v[d].limit)
				});
			return c
		}

		function n(b, c) {
			var d = 1, u = v[b], j = u.prefix, Q = v[z[a.inArray(b, z) - 1]];
			E = 0;
			F = u.until;
			b == I && ( E = Math.max(0, c[b] - 50), F = E + 100, R = E + 5, A = F - 5);
			if (u.index <= v[I].index && (!Q || Q.limit > J)) {
				P[b] = 1;
				U[0][u.label] = {};
				J >= u.limit && ( d = Math.max(Math.round(J / u.limit), 1), x = d * u.limit);
				for ( q = E; q <= F; q += d)
					U[0][u.label][q] = (j || "") + (10 > q ? "0" : "") + q + '<span class="dwtlbl">' + u.label + "</span>"
			}
		}

		function r(b) {
			var c = [], u, j = d(b);
			a(z).each(function(a, b) {
				P[b] && ( u = Math.max(Math.round(J / v[b].limit), 1), c.push(Math.round(j[b] / u) * u))
			});
			return c
		}

		function o(a) {
			u ? ( c = C - new Date, 0 > c ? (c *= -1, p = !0) : p = !1, h = 0, S = !0) : (
			void 0 !== C ? ( S = !1, c = 1E3 * C, p = "down" !== y.countDirection) : ( c = 0, S = p = "down" !== y.countDirection), a && ( h = 0))
		}

		function i(b, c, d) {
			var u = a(b).mobiscroll("getInst"), j;
			u && ( j = u[c].apply(b, d));
			return
			void 0 === j ? b : j
		}

		var q, k, x, f, e, B, c, h, p, s, R, A, G, D, K, H, E, F, w, m;
		a(this);
		var y = a.extend({}, t, b.settings), M = y.useShortLabels ? y.labelsShort : y.labels, z = "years,months,days,hours,minutes,seconds,fract".split(","), v = {
			years : {
				index : 6,
				until : 10,
				limit : 31536E6,
				label : M[0]
			},
			months : {
				index : 5,
				until : 11,
				limit : 2592E6,
				label : M[1]
			},
			days : {
				index : 4,
				until : 31,
				limit : 864E5,
				label : M[2]
			},
			hours : {
				index : 3,
				until : 23,
				limit : 36E5,
				label : M[3]
			},
			minutes : {
				index : 2,
				until : 59,
				limit : 6E4,
				label : M[4]
			},
			seconds : {
				index : 1,
				until : 59,
				limit : 1E3,
				label : M[5]
			},
			fract : {
				index : 0,
				until : 99,
				limit : 10,
				label : M[6],
				prefix : "."
			}
		}, P = {}, N = [], O = 0, l = !1, L = !0, S = !1, J = Math.max(10, 1E3 * y.step), I = y.maxWheel, T = y.locked || u, j = (a.isArray(y.controls) ? y.controls : []).join(","), C = y.targetTime, u = C &&
		void 0 !== C.getTime, Q = "jqm" == y.theme, U = [{}];
		b.start = function() {
			L && b.reset();
			if (!l && (o(), S || !(h >= c)))
				l = !0, L = !1, e = new Date, b.settings.readonly = !0, b.temp = r( p ? h : c - h), b.setValue(!0, !0, 0.1), f = h, k = setInterval(function() {
					h = new Date - e + f;
					b.temp = r( p ? h : c - h);
					b.setValue(!0, !0, 0.1);
					!S && h + x >= c && (clearInterval(k), setTimeout(function() {
						b.stop();
						h = c;
						b.temp = r( p ? h : 0);
						b.setValue(!0, !0, 0.1);
						b.trigger("onFinish", [c]);
						L = !0
					}, c - h))
				}, x), a(".dwwr", s).addClass("dw-running dw-locked"), a(".dw-timer-st", s).attr("title", y.stopText).find(".dwb-txt").text(y.stopText), b.trigger("onStart", [])
		};
		b.stop = function() {
			l && ( l = !1, clearInterval(k), h = new Date - e + f, a(".dwwr", s).removeClass("dw-running"), a(".dw-timer-st", s).attr("title", y.startText).find(".dwb-txt").text(y.startText), b.trigger("onStop", [h]))
		};
		b.reset = function() {
			b.stop();
			h = 0;
			N = [];
			O = 0;
			b.temp = r( p ? 0 : c);
			b.setValue(!0, !0, 0.1);
			b.settings.readonly = T;
			L = !0;
			T || a(".dwwr", s).removeClass("dw-locked");
			b.trigger("onReset", [])
		};
		b.lap = function() {
			l && ( B = new Date - e + f, G = B - O, O = B, N.push(B), b.trigger("lap", [B, G, N]))
		};
		b.getTime = function() {
			return c
		};
		b.setTime = function(a) {
			C = a / 1E3;
			c = a
		};
		b.getEllapsedTime = function() {
			return l ? new Date - e + f : 0
		};
		b.setEllapsedTime = function(a) {
			L || ( f = h = a, e = new Date, b.temp = r( p ? h : c - h), b.setValue(!0, !0, 0.1))
		};
		o(!0);
		!I && !c && ( I = "minutes");
		I || a(z).each(function(a, b) {
			if (!I && c >= v[b].limit)
				return I = b, !1
		});
		H = d(c);
		a(z).each(function(a, b) {
			n(b, H)
		});
		x = Math.max(87, x);
		y.autostart && setTimeout(function() {
			b.start()
		}, 0);
		return {
			wheels : U,
			headerText : !1,
			readonly : T,
			parseValue : function() {
				return r( p ? 0 : c)
			},
			formatResult : function(b) {
				var c = "", d = 0;
				a(z).each(function(a, u) {
					"fract" != u && P[u] && (c += b[d] + ("seconds" == u && P.fract ? "." + b[d + 1] : "") + " " + M[a] + " ", d++)
				});
				return c
			},
			validate : function(u, j, Q) {
				var f, e, g = 0, u = !1;
				L &&
				void 0 !== j && ( C = 0, a(z).each(function(a, c) {
					P[c] && (C += v[c].limit * b.temp[g], g++)
				}), C /= 1E3, o(!0));
				if (L && 0 === j)
					u = !0, f = d(c);
				else if (!D && (b.temp[0] < R || b.temp[0] > A))
					f = d( p ? h : c - h), u = !0;
				if (u && (n(I, f), w !== E || m !== F))
					e = b.temp[0], K = setTimeout(function() {
						w = E;
						m = F;
						D = true;
						b.temp[0] = e;
						b.changeWheel([0])
					}, 1E3 * Q);
				D = !1
			},
			onBeforeShow : function() {
				b.settings.mode = "scroller";
				b.settings.showLabel = !0
			},
			onMarkupReady : function(c) {
				var d = 0;
				s = c;
				c.addClass("dw-timer");
				l ? a(".dwwr", c).addClass("dw-running") : a(".dwwr", c).removeClass("dw-running");
				T && a(".dwwr", s).addClass("dw-locked");
				a(".dwbc", c).remove();
				a(".dwwl0", c).bind("mousedown touchstart", function() {
					clearTimeout(K)
				});
				a(z).each(function(b, u) {
					P[u] && (a(".dwwl" + d, c).addClass("dwwl-" + u), d++)
				});
				var f = j.match(/start/), e = j.match(/reset/) && !u, C = j.match(/lap/) && !u, g = "inline" !== y.display;
				if (f || e || C || g)
					a(".dwwr", c).addClass("dw-timer-btns").append('<div class="dwbc"><table cellpadding="0" cellspacing="0"><tr>' + ( f ? '<td class="dwbgr dwbgrf' + (!e && !C ? " dwbgrl" : "") + '"><span class="dwb dw-timer-st"' + ( Q ? ' data-role="button" data-icon="arrow-r" data-iconpos="notext"' : "") + ' title="' + ( l ? y.stopText : y.startText) + '"><span class="dwb-i"><span class="dwb-txt">' + ( l ? y.stopText : y.startText) + "</span></span></span></td>" : "") + ( e ? '<td class="dwbgr' + (!f ? " dwbgrf" : "") + (!C ? " dwbgrl" : "") + '"><span class="dwb dw-timer-r"' + ( Q ? ' data-role="button" data-icon="delete" data-iconpos="notext"' : "") + ' title="' + y.resetText + '"><span class="dwb-i"><span class="dwb-txt">' + y.resetText + "</span></span></span></td>" : "") + ( C ? '<td class="dwbgr dwbgrl' + (!f && !e ? " dwbgrf" : "") + '"><span class="dwb dw-timer-l"' + ( Q ? ' data-role="button" data-icon="refresh" data-iconpos="notext"' : "") + ' title="' + y.lapText + '"><span class="dwb-i"><span class="dwb-txt">' + y.lapText + "</span></span></span></td>" : "") + ( g ? '<td class="dwtcl"><span class="dwb dw-timer-cl"' + ( Q ? ' data-role="button"' : "") + '><span class="dwb-i"><span class="dwb-txt">' + y.hideText + "</span></span></span></td>" : "") + "</tr></table></div>"), b.tap(a(".dw-timer-st", c), function() {
						l ? b.stop() : b.start()
					}), b.tap(a(".dw-timer-r", c), function() {
						b.reset()
					}), b.tap(a(".dw-timer-l", c), function() {
						b.lap()
					}), b.tap(a(".dw-timer-cl", c), function() {
						b.hide()
					})
			},
			onMarkupInserted : function(b) {
				a(".dwwr", b).css("min-width", a(".dwbc table", b).width())
			},
			methods : {
				startTimer : function() {
					return i(this, "start")
				},
				stopTimer : function() {
					return i(this, "stop")
				},
				resetTimer : function() {
					return i(this, "reset")
				},
				lapTimer : function() {
					return i(this, "lap")
				},
				getTimerTime : function() {
					return i(this, "getTime")
				},
				setTimerTime : function(a) {
					return i(this, "setTime", [a])
				},
				getTimerEllapsedTime : function() {
					return i(this, "getEllapsedTime")
				},
				setTimerEllapsedTime : function(a) {
					return i(this, "setEllapsedTime", [a])
				}
			}
		}
	}
})(jQuery);
(function(a) {
	var t = {
		wheelOrder : "hhiiss",
		useShortLabels : !1,
		labels : "Years,Months,Days,Hours,Minutes,Seconds".split(","),
		labelsShort : "Yrs,Mths,Days,Hrs,Mins,Secs".split(",")
	};
	a.mobiscroll.presetShort("timespan");
	a.mobiscroll.presets.timespan = function(b) {
		function g(b) {
			var c = {};
			a(G).each(function(a, d) {
				c[d] = E[d] ? Math.floor(b / D[d].limit) : 0;
				b -= c[d] * D[d].limit
			});
			return c
		}

		function d(a, b) {
			var d = !1, f = H[E[a] - 1] || 1, e = D[a], g = e.prefix;
			B = 0;
			c = e.until;
			a == F && ( B = Math.max(0, b[a] - 50 * f), c = B + 100 * f, q = B + 5 * f, k = c - 5 * f);
			m[0][e.label] = {};
			R.match(RegExp(e.re + e.re, "i")) && ( d = !0);
			for ( r = B; r <= c; r += f)
				m[0][e.label][r] = (g || "") + (10 > r && d ? "0" : "") + r + '<span class="dwtlbl">' + e.label + "</span>"
		}

		function n(b) {
			var c = 0;
			a.each(K, function(a, d) {
				isNaN(+b[0]) || (c += D[d.v].limit * b[a])
			});
			return c
		}

		var r, o, i, q, k, x, f, e, B, c, h, p;
		a(this);
		var s = a.extend({}, t, b.settings), R = s.wheelOrder, A = s.useShortLabels ? s.labelsShort : s.labels, G = "years,months,days,hours,minutes,seconds".split(","), D = {
			years : {
				index : 6,
				until : 10,
				limit : 31536E6,
				label : A[0],
				re : "y"
			},
			months : {
				index : 5,
				until : 11,
				limit : 2592E6,
				label : A[1],
				re : "m"
			},
			days : {
				index : 4,
				until : 31,
				limit : 864E5,
				label : A[2],
				re : "d"
			},
			hours : {
				index : 3,
				until : 23,
				limit : 36E5,
				label : A[3],
				re : "h"
			},
			minutes : {
				index : 2,
				until : 59,
				limit : 6E4,
				label : A[4],
				re : "i"
			},
			seconds : {
				index : 1,
				until : 59,
				limit : 1E3,
				label : A[5],
				re : "s"
			}
		}, K = [], H = s.steps || [], E = {}, F = "seconds", w = 0, m = [{}];
		i = 0;
		e = g(i);
		a(G).each(function(a, b) {
			o = R.search(RegExp(D[b].re, "i"));
			-1 < o && (K.push({
				o : o,
				v : b
			}), D[b].index > D[F].index && ( F = b))
		});
		K.sort(function(a, b) {
			return a.o > b.o ? 1 : -1
		});
		a.each(K, function(a, b) {
			b.v == F && ( w = a);
			E[b.v] = a + 1;
			d(b.v, e)
		});
		return {
			wheels : m,
			parseValue : function(b) {
				var c = [];
				b && (a(s.labels).each(function(a, c) {
					b = b.replace(c, "")
				}), a(s.labelsShort).each(function(a, c) {
					b = b.replace(c, "")
				}), c = b.replace(/\s+/g, " ").split(" "));
				a(c).each(function(a, b) {
					c[a] = Math.floor(b / (H[a] || 1)) * (H[a] || 1)
				});
				return c
			},
			formatResult : function(b) {
				var c = "";
				a(K).each(function(a, d) {
					c += b[a] + " " + D[d.v].label + " "
				});
				return c
			},
			validate : function(a, e, m) {
				var r;
				void 0 !== e && ( i = n(b.temp));
				if (e === w || !x && (b.temp[w] < q || b.temp[w] > k))
					if ( a = g(i), d(F, a), h !== B || p !== c)
						r = b.temp[w], f = setTimeout(function() {
							h = B;
							p = c;
							x = !0;
							b.temp[w] = r;
							b.changeWheel([w])
						}, 1E3 * m);
				x = !1
			},
			onBeforeShow : function() {
				b.settings.mode = "scroller";
				b.settings.showLabel = !0;
				i = n(b.temp);
				e = g(i);
				d(F, e)
			},
			onMarkupReady : function(b) {
				b.addClass("dw-timespan");
				a(".dwwl" + w, b).bind("mousedown touchstart", function() {
					clearTimeout(f)
				})
			}
		}
	}
})(jQuery);
(function(a) {
	var t = {
		controls : ["calendar"],
		firstDay : 0,
		firstSelectDay : 0,
		swipe : !0,
		events : !1,
		prevText : "Prev",
		nextText : "Next"
	};
	a.mobiscroll.presetShort("calendar");
	a.mobiscroll.presets.calendar = function(b) {
		function g(a, b) {
			var c, d, e;
			if (b) {
				if (b.dates)
					for ( c = 0; c < b.dates.length; c++)
						if ( e = b.dates[c], d = e.d || e, d.getTime() === a.getTime())
							return e;
				if (b.daysOfMonth)
					for ( c = 0; c < b.daysOfMonth.length; c++)
						if ( e = b.daysOfMonth[c], d = e.d || e, d = (d + "").split("/"), d[1]) {
							if (d[0] - 1 == a.getMonth() && d[1] == a.getDate())
								return e
						} else if (d[0] == a.getDate())
							return e;
				if (b.daysOfWeek)
					for ( c = 0; c < b.daysOfWeek.length; c++)
						if ( e = b.daysOfWeek[c], d = e.d || e, d === a.getDay())
							return e
			}
			return !1
		}

		function d(a, c) {
			var d, e, f, h, i, k, q, x, r, m, n, o = 1, p = 0;
			e = new Date(a, c, 1);
			var w = e.getFullYear(), s = e.getMonth(), A = b.getDate(b.temp), y = (new Date(w, s + 1, 0)).getDate(), v = (new Date(w, s, 1)).getDay(), B = (new Date(w, s, 0)).getDate() - v + 1, z = '<table cellpadding="0" cellspacing="0">';
			1 < l.firstDay - v + 1 && ( p = 7);
			for ( n = 0; 42 > n; n++)
				m = n + l.firstDay - p, d = new Date(w, s, m - v + 1), e = d.getFullYear(), f = d.getMonth(), h = d.getDate(), i = d < new Date(H.getFullYear(), H.getMonth(), H.getDate()) || d > E ? !1 : !1 === g(d, l.invalid), k = g(d, l.marked), x = k.text || "&nbsp;", q = I ?
				void 0 !== b._selectedValues[d] : A.getFullYear() === e && A.getMonth() === f && A.getDate() === h, r = m < v || m >= y + v, 0 == n % 7 && (z += ( n ? "</tr>" : "") + "<tr" + (!I && 0 <= A - d && 6048E5 > A - d ? ' class="dw-cal-week-hl"' : "") + ">", L && ("month" == L && f !== s && n ? o = 1 == h ? 1 : 2 : "year" == L && ( o = d, o = new Date(o), o.setHours(0, 0, 0), o.setDate(o.getDate() + 4 - (o.getDay() || 7)), d = new Date(o.getFullYear(), 0, 1), o = Math.ceil(((o - d) / 864E5 + 1) / 7)), z += '<td class="dw-week-nr dw-cal-day">' + o + "</td>", o++)), z += '<td class="dw-cal-day dw-cal-day-' + n % 7 + ( J ? " ui-body-c" : "") + ( q ? " dw-sel" : "") + (i && r ? " dw-cal-day-diff" : "") + ( i ? " dw-cal-day-v" : "") + '" data-date="' + (m - v + 1) + '" data-full="' + e + "-" + f + "-" + h + '"><div class="dw-i' + (q && J ? " ui-btn-active" : "") + (i && J ? ' ui-btn-up-c ui-state-default ui-btn" data-theme="c"' : '"') + ">" + (m < v ? B + m : m >= y + v ? m - y - v + 1 : m - v + 1) + (l.events ? k.text ? '<div class="dw-cal-day-txt' + ( J ? " ui-shadow" + ( q ? " ui-btn-up-c" : " ui-btn-up-b") : "") + '" title="' + x + '">' + x + "</div>" : "" : k ? '<div class="dw-cal-day-m"></div>' : "") + "</div></td>";
			return z + "</tr></table>"
		}

		function n(b, d) {
			a(".dw-cal-my", c).text(l.monthNames[d] + " " + b);
			new Date(b, d - 1, 1) < D ? a(".dw-cal-prev", c).addClass(T) : a(".dw-cal-prev", c).removeClass(T);
			new Date(b, d + 1, 1) > K ? a(".dw-cal-next", c).addClass(T) : a(".dw-cal-next", c).removeClass(T)
		}

		function r() {
			f = b.getDate(b.temp);
			if (f.getFullYear() === w && f.getMonth() === m) {
				if ( F = f, f = b.getDate(b.temp), f.getFullYear() === w && f.getMonth() === m && !I) {
					a(".dw-cal .dw-sel", c).removeClass("dw-sel");
					var e = a('.dw-cal .dw-cal-day[data-full="' + w + "-" + m + "-" + f.getDate() + '"]', c).addClass("dw-sel").parent();
					a(".dw-cal-week-hl", c).removeClass("dw-cal-week-hl");
					e && e.addClass("dw-cal-week-hl");
					J && (a(".dw-cal .ui-btn-active", c).removeClass("ui-btn-active"), a(".dw-cal .dw-cal-day-txt", c).removeClass("ui-btn-up-c").addClass("ui-btn-up-b"), a(".dw-cal .dw-sel .dw-i", c).addClass("ui-btn-active"), a(".dw-cal .dw-sel .dw-cal-day-txt", c).removeClass("ui-btn-up-b").addClass("ui-btn-up-c"))
				}
			} else
				f > F ? ( w = f.getFullYear(), m = f.getMonth(), A.html(d(w, m)), i.call(this, w, m, "next")) : f < F && ( w = f.getFullYear(), m = f.getMonth(), s.html(d(w, m)), i.call(this, w, m, "prev"))
		}

		function o(a, b, c) {
			s.html(d(a, b - 1));
			R.html(c);
			A.html(d(a, b + 1))
		}

		function i(a, c, d) {
			N ? O.push({
				y : a,
				m : c,
				dir : d
			}) : ( f = new Date(a, c, 1), a = f.getFullYear(), c = f.getMonth(), b.trigger("onMonthChange", [a, c]), N = !0, "next" == d ? ( G = A.html(), s.hide(), A.show(), h.removeClass("dw-cal-anim-prev")) : ( G = s.html(), s.show(), A.hide(), h.addClass("dw-cal-anim-prev")), n(a, c), setTimeout(function() {
				d == "next" ? h.addClass("dw-cal-anim-a dw-cal-anim-prev") : h.addClass("dw-cal-anim-a").removeClass("dw-cal-anim-prev");
				setTimeout(function() {
					front.html(G);
					h.removeClass("dw-cal-anim-a");
					o(a, c, G);
					N = false;
					if (O.length) {
						var b = O.shift();
						i(b.y, b.m, b.dir)
					} else {
						w = a;
						m = c;
						F = new Date(a, c, 1)
					}
				}, 200)
			}, 10))
		}

		function q() {
			if (I)
				if ( f = new Date(w, m, a(this).attr("data-date")), "week" == l.selectType) {
					var d, e = a(this).hasClass("dw-sel"), u = f.getDay() - l.firstSelectDay, g = 0, u = 0 > u ? 7 + u : u;
					l.multiSelect || (b._selectedValues = {});
					for (g; 7 > g; g++)
						d = new Date(f.getFullYear(), f.getMonth(), f.getDate() - u + g), e ?
						delete b._selectedValues[d] : b._selectedValues[d] = d;
					k()
				} else
					d = a('.dw-cal .dw-cal-day[data-full="' + a(this).attr("data-full") + '"]', c).toggleClass("dw-sel"), J && (a(".dw-i", d).toggleClass("ui-btn-active"), a(".dw-cal-day-txt", d).toggleClass("ui-btn-up-b ui-btn-up-c")), a(this).hasClass("dw-sel") ? b._selectedValues[f] = f :
					delete b._selectedValues[f];
			d = "inline" === l.display;
			f = b.getDate(b.temp);
			b.setDate(new Date(w, m, a(this).attr("data-date"), f.getHours(), f.getMinutes(), f.getSeconds()), d, 0.2, !d);
			b.trigger("onDayChange", [{
				date : f,
				marked : 0 < a(".dw-cal-day-m", this).length,
				cell : this
			}])
		}

		function k() {
			I && b.isVisible() && ( G = d(w, m), front.html(G), o(w, m, G))
		}

		function x(a, b) {
			var c = a.originalEvent, d = a.changedTouches;
			return d || c && c.changedTouches ? c ? c.changedTouches[0]["page" + b] : d[0]["page" + b] : a["page" + b]
		}

		var f, e, B, c, h, p, s, R, A, G, D, K, H, E, F, w, m, y, M, z, v, P, N = !1, O = [], l = a.extend({}, t, b.settings), L = l.weekCounter, S = l.layout || (/top|bottom/.test(l.display) ? "liquid" : ""), J = "jqm" == l.theme, I = l.multiSelect || "week" == l.selectType, T = "dw-cal-btn-d" + ( J ? " ui-disabled" : "");
		y = l.controls.join(",");
		b.settings.preset = "date" + (y.match(/time/) ? "time" : "");
		if (b.settings.selectedValues)
			for ( e = 0; e < b.settings.selectedValues.length; e++)
				f = b.settings.selectedValues[e], b._selectedValues[f] = f;
		b.addValue = function(a) {
			b._selectedValues[a] = a;
			k()
		};
		b.removeValue = function(a) {
			delete b._selectedValues[a];
			k()
		};
		b.setValues = function(a) {
			var c = 0;
			b._selectedValues = {};
			for (c; c < a.length; c++)
				b._selectedValues[a[c]] = a[c];
			k()
		};
		b._setValue || (b._setValue = b.setValue);
		b.setValue = function() {
			b._setValue.apply(this, arguments);
			b.isVisible() ? r() : F = b.getDate(b.temp)
		};
		B = a.mobiscroll.presets.datetime.call(this, b);
		a.extend(B, {
			onMarkupReady : function(g) {
				c = g;
				f = b.getDate(b.temp);
				l = a.extend({}, t, b.settings);
				F = f;
				w = f.getFullYear();
				m = f.getMonth();
				if (l.minDate) {
					D = new Date(l.minDate.getFullYear(), l.minDate.getMonth(), 1);
					H = l.minDate
				} else
					H = D = new Date(l.startYear, 0, 1);
				if (l.maxDate) {
					K = new Date(l.maxDate.getFullYear(), l.maxDate.getMonth(), 1);
					E = l.maxDate
				} else
					E = K = new Date(l.endYear, 11, 31, 23, 59, 59);
				g.addClass("dw-calendar");
				y.match(/date/) || a(".dwc", c).eq(0).addClass("dwc-h");
				p = '<div class="dwc dw-cal-c"><div class="dw-cal' + (l.events ? " dw-cal-ev" : "") + ( J ? " ui-body-c" : "") + '"><div class="dw-cal-header"><div class="dw-cal-btnc"><div class="dw-cal-prev dw-cal-btn dwb"><div class="dw-cal-btn-txt"' + ( J ? 'data-role="button" data-icon="arrow-l" data-iconpos="notext"' : "") + ">" + l.prevText + '</div></div><span class="dw-cal-my">' + l.monthNames[m] + " " + w + '</span><div class="dw-cal-next dw-cal-btn dwb"><div class="dw-cal-btn-txt"' + ( J ? 'data-role="button" data-icon="arrow-r" data-iconpos="notext"' : "") + ">" + l.nextText + '</div></div></div><table cellpadding="0" cellspacing="0"><tr>';
				L && ( p = p + '<th class="dw-week-nr">&nbsp;</th>');
				for ( e = 0; e < 7; e++)
					p = p + ("<th>" + l.dayNamesShort[(e + l.firstDay) % 7] + "</th>");
				p = p + '</tr></table></div><div class="dw-cal-anim-c"><div class="dw-cal-front"></div><div class="dw-cal-anim"><div class="dw-cal-slide dw-cal-slide1" style="display:none;"></div><div class="dw-cal-slide dw-cal-slide2"></div><div class="dw-cal-slide dw-cal-slide3"></div></div></div><div class="dw-cal-f"></div></div></div>';
				a(".dwcc, .dwbc", c).before(p);
				h = a(".dw-cal-anim-c", c);
				front = a(".dw-cal-front", c);
				s = a(".dw-cal-slide1", c);
				R = a(".dw-cal-slide2", c);
				A = a(".dw-cal-slide3", c);
				G = d(w, m);
				front.html(G);
				o(w, m, G);
				h.delegate(".dw-cal-day-v", "touchstart mousedown", function(b) {
					a(this).addClass("dwb-a");
					M = x(b, "X");
					z = x(b, "Y")
				}).delegate(".dw-cal-day-v", "touchstart", function() {
					u = true
				}).delegate(".dw-cal-day-v", "touchend", function(a) {
					!N && Math.abs(x(a, "X") - M) < 20 && Math.abs(x(a, "Y") - z) < 20 && q.call(this)
				}).delegate(".dw-cal-day-v", "click", function() {
					!N && !u && q.call(this)
				});
				b.tap(a(".dw-cal-prev", c), function() {
					!a(this).hasClass("dw-cal-btn-d") && O.length < 5 && i(w, --m, "prev")
				});
				b.tap(a(".dw-cal-next", c), function() {
					!a(this).hasClass("dw-cal-btn-d") && O.length < 5 && i(w, ++m, "next")
				});
				S == "liquid" && !y.match(/date|time/) && l.display !== "bubble" ? g.addClass("dw-cal-liq") : l.calendarWidth && a(".dw-cal", c).width(l.calendarWidth);
				l.calendarHeight && a(".dw-cal-anim-c", c).height(l.calendarHeight);
				a(window).bind("orientationchange.dw-cal", function() {
					c.hide();
					c[0].offsetHeight
					c.show()
				});
				if (l.swipe) {
					var k = true, u = "ontouchstart" in window, Q, n;
					h.bind( u ? "touchstart" : "mousedown", function(b) {
						if (k) {
							Q = new Date;
							M = x(b, "X");
							z = x(b, "Y");
							k = false;
							a(document).bind( u ? "touchmove.dw-sw" : "mousemove.dw-sw", function(b) {
								v = x(b, "X");
								P = x(b, "Y");
								n = new Date;
								diff = v - M;
								!N && (Math.abs(v - M) > 20 || Math.abs(P - z) > 20) && a(".dwb-a", c).removeClass("dwb-a");
								n - Q < 300 && Math.abs(diff) > 20 && b.preventDefault()
							}).bind( u ? "touchend.dw-sw touchcancel.dw-sw" : "mouseup.dw-sw", function(b) {
								k = true;
								n = new Date;
								v = x(b, "X");
								diff = v - M;
								n - Q < 300 && O.length < 5 && (diff > 50 && !a(".dw-cal-prev", c).hasClass("dw-cal-btn-d") ? i(w, --m, "prev") : diff < -50 && !a(".dw-cal-next", c).hasClass("dw-cal-btn-d") && i(w, ++m, "next"));
								a(document).unbind(".dw-sw")
							})
						}
					})
				}
			},
			onPosition : function() {
				if (S == "liquid" && l.display == "modal") {
					a(".dwwr", c).width("auto");
					h.height("auto");
					var b = window.innerHeight || a(window).height(), d = a(".dw", c).outerHeight(), e = d - h.height();
					b > d && h.height(b - e)
				}
			},
			onChange : r,
			onClose : function() {
				a(window).unbind(".dw-cal")
			},
			methods : a.extend(B.methods, {
				addValue : function(b) {
					var c = a(this).mobiscroll("getInst");
					c && c.addValue(b);
					return this
				},
				removeValue : function(b) {
					var c = a(this).mobiscroll("getInst");
					c && c.removeValue(b);
					return this
				},
				setValues : function(b) {
					var c = a(this).mobiscroll("getInst");
					c && c.setValues(b);
					return this
				}
			})
		});
		return B
	}
})(jQuery);
(function(a) {
	var t = {
		inputClass : "",
		values : 5,
		order : "desc",
		style : "star",
		invalid : []
	};
	a.mobiscroll.presetShort("rating");
	a.mobiscroll.presets.rating = function(b) {
		var g = a.extend({}, t, b.settings), d = a(this), n = this.id + "_dummy";
		a('label[for="' + this.id + '"]').attr("for", n);
		var r = a('label[for="' + n + '"]'), r =
		void 0 !== g.label ? g.label : r.length ? r.text() : d.attr("name"), o = [{}], i = {}, q = {}, k = [], x, f = !1, e, B, c, h, p, s = "grade" === g.style ? "circle" : "star";
		x = null;
		d.is("select") && (g.values = {}, a("option", d).each(function() {
			g.values[a(this).val()] = a(this).text()
		}), a("#" + n).remove());
		if (a.isArray(g.values))
			for ( e = 0; e < g.values.length; e++)
				c = +g.values[e], isNaN(c) && ( c = e + 1, f = !0), k.push({
					order : c,
					key : g.values[e],
					value : g.values[e]
				});
		else if (a.isPlainObject(g.values))
			for (B in e = 1, f = !0, g.values) c = +B, isNaN(c) && ( c = e), k.push({
				order : c,
				key : B,
				value : g.values[B]
			}), e++;
		else
			for ( e = 1; e <= g.values; e++)
				k.push({
					order : e,
					key : e,
					value : e
				});
		void 0 === g.showText && f && (g.showText = !0);
		k.sort(function(a, b) {
			return g.order == "desc" ? b.order - a.order : a.order - b.order
		});
		p = "desc" == g.order ? k[0].order : k[k.length - 1].order;
		for ( e = 0; e < k.length; e++) {
			f = "";
			order = k[e].order;
			c = k[e].key;
			h = k[e].value;
			for ( B = 1; B < order + 1; B++)
				f += '<div class="rating-star-cont"><div class="rating-' + s + " rating-filled-" + s + '">' + ("circle" == s ? B : "") + "</div></div>";
			for ( B = order + 1; B <= p; B++)
				f += '<div class="rating-star-cont"><div class="rating-' + s + " rating-unfilled-" + s + '"></div></div>';
			f += g.showText ? '<div class="rating-txt">' + h + "</div>" : "";
			i["_" + c] = f;
			q["_" + c] = h
		}
		d.is("select") && ( x = a('<input type="text" id="' + n + '" value="' + q["_" + d.val()] + '" class="' + g.inputClass + '" readonly />').insertBefore(d));
		o[0][r] = i;
		g.showOnFocus && x && x.focus(function() {
			b.show()
		});
		d.is("select") && d.hide().closest(".ui-field-contain").trigger("create");
		return {
			height : "wp" === g.theme || "wp light" === g.theme ? 76 : 40,
			wheels : o,
			headerText : !1,
			formatResult : function(a) {
				return q[a[0]]
			},
			parseValue : function() {
				var a, b;
				for (b in q) {
					a ===
					void 0 && ( a = b);
					if (x && b == "_" + d.val() || !x && q[b] == d.val())
						return [b]
				}
				return [a]
			},
			validate : function(b) {
				a.each(g.invalid, function(c, d) {
					a('.dw-li[data-val="_' + d + '"]', b).removeClass("dw-v")
				})
			},
			onSelect : function(a, b) {
				if (x) {
					x.val(a);
					d.val(b.values[0] ? b.values[0].replace(/_/, "") : "").trigger("change")
				}
			},
			onChange : function(a, b) {
				if (g.display == "inline" && x) {
					x.val(a);
					d.val(b.values[0] ? b.values[0].replace(/_/, "") : "").trigger("change")
				}
			},
			onClose : function() {
				x && x.blur()
			}
		}
	}
})(jQuery);
(function(a) {
	var t = {
		batch : 50,
		min : 0,
		max : 100,
		defUnit : "",
		units : null,
		unitNames : null,
		invalid : [],
		sign : !1,
		signText : "&nbsp;",
		wholeText : "Whole",
		fractionText : "Fraction",
		unitText : "Unit",
		step : 0.05,
		convert : function(a) {
			return a
		}
	};
	a.mobiscroll.presets.measurement = function(b) {
		function g(a) {
			return E ? 0 > a ? Math.ceil(a) : Math.floor(a) : o(Math.round(a), w)
		}

		function d(a) {
			return E ? o(100 * (Math.abs(a) - g(Math.abs(a))), w) : 0
		}

		function n(a) {
			var b = g(a), c = d(a);
			100 <= c && (0 > a ? b-- : b++, c = 0);
			return [0 > a ? "-" : "+", b, c]
		}

		function r(a) {
			var b = q(a[v], !0) - 0, d = E ? q(a[z]) / 100 * (0 > b ? -1 : 1) : 0;
			return (c.sign && "-" == a[0] ? -1 : 1) * (b + d)
		}

		function o(a, b) {
			return Math.round(a / b) * b
		}

		function i(a, b) {
			for (a += ""; a.length < b; )
				a = "0" + a;
			return a
		}

		function q(a, b) {
			return a ? b ? a.replace(/_/g, "") : a.replace(/_|\+|\-/g, "") : ""
		}

		function k(a, b, d) {
			return b === d ? a : c.convert.call(this, a, b, d)
		}

		function x(a, b, c) {
			a = a > c ? c : a;
			return a < b ? b : a
		}

		function f(a) {
			N = k(c.min, K, a);
			O = k(c.max, K, a);
			l = g(N);
			L = g(O);
			S = d(N);
			J = d(O);
			100 <= J && (L++, J = 0)
		}

		function e(a, b) {
			f(a);
			h = {};
			var d = +l, e = +L, g = E ? 1 : w, k;
			c.sign && ( e = Math.abs(d) > Math.abs(e) ? Math.abs(d) : Math.abs(e), d = 0 > d ? 0 : d);
			k = b - R * g;
			k = k < d ? d : k;
			d = k + 2 * R * g;
			d = d > e ? e : d;
			if (k !== A || d !== G) {
				for ( j = k; j <= d; j += g)
					h["_" + j] = j;
				p[0][c.wholeText] = h;
				A = k;
				G = d;
				return !0
			}
			return !1
		}

		function B(b) {
			if (F) {
				h = {};
				var d = s.length, b = a.inArray(+b, s), e, f;
				for ( j = -50; 50 > j; j++)
					e = (j + b) % d, f = s[0 > e ? d + e : e], e = Math.abs(Math.floor((j + b) / d)), h["_" + Array(e).join(0 > j + b ? "-" : "+") + f] = "." + i(f, 2);
				p[0][c.fractionText] = h
			}
		}

		var c = a.extend({}, t, b.settings);
		a(this);
		var h = {}, p = [{}], s = [], R = c.batch, A, G, D = c.units && c.units.length, K = D ? c.defUnit || c.units[0] : "", H = c.unitNames || c.units, E = 1 > c.step, F = !1, w = Math.round( E ? 100 * c.step : c.step), m, y, M = -1, z, v, P, N, O, l, L, S, J, I, T = {}, j, C = 0;
		if (c.sign) {
			sign = !1;
			for ( j = 0; j < c.units.length; j++)
				0 > k(c.min, K, c.units[j]) && ( sign = !0);
			c.sign = c.sign && sign
		}
		c.sign && ( h = {
			"-" : "-",
			"+" : "+"
		}, p[0][c.signText] = h, M = C++);
		p[0][c.wholeText] = {};
		v = C++;
		if (E) {
			h = {};
			for ( j = 0; 100 > j; j += w)
				s.push(j), h["_" + j] = "." + i(j, 2);
			F = s.length > c.rows;
			p[0][c.fractionText] = F ? {} : h;
			z = C++
		}
		if (D) {
			h = {};
			for ( j = 0; j < c.units.length; j++)
				h[j] = H[j];
			p[0][c.unitText] = h
		}
		P = C;
		return {
			width : 55,
			wheels : p,
			formatResult : function(a) {
				return r(a).toFixed( E ? 2 : 0) + ( D ? " " + H[a[P]] : "")
			},
			parseValue : function(b) {
				var d = b.split(" "), e = +d[0], b = [], g = "";
				if (D) {
					g = a.inArray(d[1], H);
					g = g == -1 ? a.inArray(K, c.units) : g;
					g = g == -1 ? 0 : g
				}
				f( D ? c.units[g] : "");
				e = isNaN(e) ? 0 : e;
				d = n(e);
				d[1] = x(d[1], l, L);
				if (c.sign) {
					b[0] = d[0];
					d[1] = Math.abs(d[1])
				}
				b[v] = "_" + d[1];
				E && (b[z] = "_" + d[2]);
				D && (b[P] = g);
				return b
			},
			onBeforeShow : function() {
				e( D ? c.units[b.temp[P]] : "", q(b.temp[v]));
				B(q(b.temp[z]));
				I = true
			},
			onShow : function(b) {
				a(".dwwl", b).bind("mousedown touchstart", function() {
					clearTimeout(T[a(".dwwl", b).index(this)])
				})
			},
			onCancel : function() {
				m =
				void 0
			},
			validate : function(d, f, g) {
				var h = b.temp, i, p = [], s, A, t, C, G = q(h[z]) - 0, H = D ? c.units[h[P]] : "";
				if (c.sign && f === 0) {
					m = Math.abs(m) * (h[f] === "-" ? -1 : 1);
					p = F ? [v, z] : [v]
				}
				if (f === v || f === z && E || m ===
				void 0 || f ===
				void 0 && !I) {
					m = r(h);
					y = H
				}
				if (D && (f === P && y !== H || f ===
				void 0 && !I)) {
					m = k(m, y, H);
					y = H;
					A = n(m);
					c.sign && (h[0] = A[0]);
					e(H, c.sign ? Math.abs(A[1]) : A[1]);
					B(G);
					p = F ? [v, z] : [v];
					s = f ? 0.2 : g
				}
				m = x(m, N, O);
				A = n(m);
				t = c.sign ? Math.abs(A[1]) : A[1];
				i = c.sign ? h[0] == "-" : m < 0;
				h[v] = "_" + t;
				E && (h[z] = "_" + A[2]);
				if (f === v) {
					e(H, t);
					p.push(v)
				}
				if (f === z && F) {
					B(G);
					p.push(z)
				}
				if (c.sign && f ===
				void 0) {
					t = a(".dw-ul", d).eq(M);
					a(".dw-li", t).addClass("dw-v");
					N > 0 && a(".dw-li", t).eq(0).removeClass("dw-v");
					O < 0 && a(".dw-li", t).eq(1).removeClass("dw-v")
				}
				if (c.sign && !f) {
					t = a(".dw-ul", d).eq(v);
					a(".dw-li", t).addClass("dw-v");
					j = a(".dw-li", t).index(a('.dw-li[data-val="_' + Math.abs( i ? l : L) + '"]', t));
					j != -1 && a(".dw-li", t).slice(j + 1).removeClass("dw-v")
				}
				if (f !== z && E) {
					t = a(".dw-ul", d).eq(z);
					a(".dw-li", t).addClass("dw-v");
					var h = c.sign ? h[0] + q(h[1]) : (m < 0 ? "-" : "+") + Math.abs(A[1]), G = (N < 0 ? "-" : "+") + Math.abs(l), R = (O < 0 ? "-" : "+") + Math.abs(L);
					h === G && a(".dw-li", t).each(function() {
						C = q(a(this).attr("data-val"));
						( i ? C > S : C < S) && a(this).removeClass("dw-v")
					});
					h === R && a(".dw-li", t).each(function() {
						C = q(a(this).attr("data-val"));
						( i ? C < J : C > J) && a(this).removeClass("dw-v")
					});
					for ( j = 0; j < c.invalid.length; j++) {
						var V = n(k(c.invalid[j], K, H));
						A[0] === V[0] && A[1] === V[1] && a(".dw-li", t).each(function() {
							q(a(this).attr("data-val")) == V[2] && a(this).removeClass("dw-v")
						})
					}
				}
				if (!E) {
					t = a(".dw-ul", d).eq(v);
					for ( j = 0; j < c.invalid.length; j++)
						a('.dw-li[data-val="_' + o(k(c.invalid[j], K, H), w) + '"]', t).removeClass("dw-v")
				}
				if (p.length) {
					T[f] = setTimeout(function() {
						I = true;
						b.changeWheel(p, s)
					}, f ===
					void 0 ? 0 : g * 1E3);
					return false
				}
				I = false
			}
		}
	}
})(jQuery);
(function(a) {
	var t = {
		min : 0,
		max : 100,
		convert : !0,
		defUnit : "kph",
		units : ["kph", "mph", "mps", "fps", "knot"],
		unitNames : {
			kph : "km/h",
			mph : "mi/h",
			mps : "m/s",
			fps : "ft/s",
			knot : "knot"
		}
	}, b = {
		kph : 1,
		mph : 1.60934,
		mps : 3.6,
		fps : 1.09728,
		knot : 1.852
	};
	a.mobiscroll.presetShort("speed");
	a.mobiscroll.presets.speed = function(g) {
		var d = a.extend({}, t, g.settings), n = d.convert, r = [], o = [], i, q;
		if (d.units)
			for ( q = 0; q < d.units.length; q++)
				i = d.units[q], b[i] && (r.push(i), o.push(d.unitNames[i] || i));
		g.settings = a.extend(d, {
			sign : !1,
			units : r,
			unitNames : o,
			convert : function(a, d, f) {
				return n ? a * b[d] / b[f] : a
			}
		});
		return a.mobiscroll.presets.measurement.call(this, g)
	}
})(jQuery);
(function(a) {
	var t = {
		min : -20,
		max : 40,
		convert : !0,
		defUnit : "c",
		units : ["c", "k", "f", "r"],
		unitNames : {
			c : "\u00b0C",
			k : "\u00b0K",
			f : "\u00b0F",
			r : "\u00b0R"
		}
	}, b = {
		c : 1,
		k : 1,
		f : 1,
		r : 1
	}, g = {
		c2k : function(a) {
			return a + 273.15
		},
		c2f : function(a) {
			return 9 * a / 5 + 32
		},
		c2r : function(a) {
			return 9 * (a + 273.15) / 5
		},
		k2c : function(a) {
			return a - 273.15
		},
		k2f : function(a) {
			return 9 * a / 5 - 459.67
		},
		k2r : function(a) {
			return 9 * a / 5
		},
		f2c : function(a) {
			return 5 * (a - 32) / 9
		},
		f2k : function(a) {
			return 5 * (a + 459.67) / 9
		},
		f2r : function(a) {
			return a + 459.67
		},
		r2c : function(a) {
			return 5 * (a - 491.67) / 9
		},
		r2k : function(a) {
			return 5 * a / 9
		},
		r2f : function(a) {
			return a - 459.67
		}
	};
	a.mobiscroll.presetShort("temperature");
	a.mobiscroll.presets.temperature = function(d) {
		var n = a.extend({}, t, d.settings), r = n.convert, o = [], i = [], q, k;
		if (n.units)
			for ( k = 0; k < n.units.length; k++)
				q = n.units[k], b[q] && (o.push(q), i.push(n.unitNames[q] || q));
		d.settings = a.extend(n, {
			sign : !0,
			units : o,
			unitNames : i,
			convert : function(a, b, d) {
				return r ? g[b+"2"+d](a) : a
			}
		});
		return a.mobiscroll.presets.measurement.call(this, d)
	}
})(jQuery);
(function(a) {
	var t = {
		min : 0,
		max : 100,
		convert : !0,
		defUnit : "km",
		units : "m,km,in,ft,yd,mi".split(",")
	}, b = {
		mm : 0.0010,
		cm : 0.01,
		dm : 0.1,
		m : 1,
		dam : 10,
		hm : 100,
		km : 1E3,
		"in" : 0.0254,
		ft : 0.3048,
		yd : 0.9144,
		ch : 20.1168,
		fur : 201.168,
		mi : 1609.344,
		lea : 4828.032
	};
	a.mobiscroll.presetShort("distance");
	a.mobiscroll.presets.distance = function(g) {
		var d = a.extend({}, t, g.settings), n = d.convert, r = [], o, i;
		if (d.units)
			for ( i = 0; i < d.units.length; i++)
				o = d.units[i], b[o] && r.push(o);
		g.settings = a.extend(d, {
			sign : !1,
			units : r,
			unitNames : null,
			convert : function(a, d, g) {
				return n ? a * b[d] / b[g] : a
			}
		});
		return a.mobiscroll.presets.measurement.call(this, g)
	}
})(jQuery);
(function(a) {
	var t = {
		min : 0,
		max : 1E3,
		convert : !0,
		defUnit : "kg",
		units : ["g", "kg", "oz", "lb"],
		unitNames : {
			tlong : "t (long)",
			tshort : "t (short)"
		}
	}, b = {
		mg : 0.0010,
		cg : 0.01,
		dg : 0.1,
		g : 1,
		dag : 10,
		hg : 100,
		kg : 1E3,
		t : 1E6,
		drc : 1.7718452,
		oz : 28.3495,
		lb : 453.59237,
		st : 6350.29318,
		qtr : 12700.58636,
		cwt : 50802.34544,
		tlong : 1016046.9088,
		tshort : 907184.74
	};
	a.mobiscroll.presetShort("mass");
	a.mobiscroll.presets.mass = function(g) {
		var d = a.extend({}, t, g.settings), n = d.convert, r = [], o = [], i, q;
		if (d.units)
			for ( q = 0; q < d.units.length; q++)
				i = d.units[q], b[i] && (r.push(i), o.push(d.unitNames[i] || i));
		g.settings = a.extend(d, {
			sign : !1,
			units : r,
			unitNames : o,
			convert : function(a, d, f) {
				return n ? a * b[d] / b[f] : a
			}
		});
		return a.mobiscroll.presets.measurement.call(this, g)
	}
})(jQuery);
(function(a) {
	var t = {
		min : 0,
		max : 100,
		convert : !0,
		defUnit : "N",
		units : ["N", "kp", "lbf", "pdl"]
	}, b = {
		N : 1,
		kp : 9.80665,
		lbf : 4.448222,
		pdl : 0.138255
	};
	a.mobiscroll.presetShort("force");
	a.mobiscroll.presets.force = function(g) {
		var d = a.extend({}, t, g.settings), n = d.convert, r = [], o, i;
		if (d.units)
			for ( i = 0; i < d.units.length; i++)
				o = d.units[i], b[o] && r.push(o);
		g.settings = a.extend(d, {
			sign : !1,
			units : r,
			unitNames : null,
			convert : function(a, d, g) {
				return n ? a * b[d] / b[g] : a
			}
		});
		return a.mobiscroll.presets.measurement.call(this, g)
	}
})(jQuery);
