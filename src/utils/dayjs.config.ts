import dayjs from 'dayjs'
import 'dayjs/locale/th'

import duration from 'dayjs/plugin/duration'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.locale('th')
dayjs.extend(duration)
dayjs.extend(buddhistEra)

export default dayjs
