import dayjs from 'dayjs'
import 'dayjs/locale/th'

import duration from 'dayjs/plugin/duration'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('th')
dayjs.extend(duration)
dayjs.extend(buddhistEra)
dayjs.extend(customParseFormat)

export default dayjs
