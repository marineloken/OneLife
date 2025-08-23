package screens.detail

import cafe.adriel.voyager.core.model.ScreenModel
import data.MuseumObject
import data.MuseumRepository
import kotlinx.coroutines.flow.Flow

class DetailScreenModel(private val museumRepository: MuseumRepository) : ScreenModel {
    fun getObject(objectId: Int): Flow<MuseumObject?> =
        museumRepository.getObjectById(objectId)
}
