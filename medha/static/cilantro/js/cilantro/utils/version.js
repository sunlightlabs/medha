define([],function(){var r=/^\d+\.\d+\.\d+$/,n=function(n){n||(n="");for(var e=n.replace(/[abrf].*$/g,""),t=e.split("."),i=0;3>i;i++)t[i]=t[i]||0;var o;if(!r.test(o=t.join(".")))throw new Error("Bad version string: "+n);return o},e=function(r){var e=n(r).split(".");return{major:parseInt(e[0],10),minor:parseInt(e[1],10),micro:parseInt(e[2],10)}},t=function(r,n){switch(r=e(r),n=e(n),!0){case r.major>n.major:return 1;case r.major<n.major:return-1}switch(!0){case r.minor>n.minor:return 1;case r.minor<n.minor:return-1}switch(!0){case r.micro>n.micro:return 1;case r.micro<n.micro:return-1}return 0},i=function(r,n){return 0===t(r,n)},o=function(r,n){return 1===t(r,n)},s=function(r,n){return t(r,n)>-1},c=function(r,n){return-1===t(r,n)},u=function(r,n){return t(r,n)<1},a=function(r,n,e){return s(r,n)&&u(r,e)};return{cleanVersionString:n,parseVersionString:e,compareVersions:t,versionIsEqual:i,versionIsGt:o,versionIsGte:s,versionIsLt:c,versionIsLte:u,versionInRange:a}});
//# sourceMappingURL=version.js
//# sourceMappingURL=version.js.map