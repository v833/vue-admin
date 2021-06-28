export default function getSvg(src) {
  const req = require.context(src, false, /\.svg$/)
  const requireAll = requireContext => {
    return requireContext.keys().map(requireContext)
  }
  requireAll(req)
}
/* 
require.context(‘./svg’, false, /\.svg$/) 参数说明：
第一个：目录
第二个：是否遍历子级目录
第三个：定义遍历文件规则

*/
