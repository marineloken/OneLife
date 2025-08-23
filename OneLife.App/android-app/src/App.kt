package onelife

import android.app.Application
import di.initKoin

class OneLifeApp : Application() {
    override fun onCreate() {
        super.onCreate()
        initKoin()
    }
}
