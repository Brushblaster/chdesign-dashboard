export default function ({
  $axios
}) {
  delete $axios.defaults.headers.common["Authorization"]
  $axios.setToken(false)
}
