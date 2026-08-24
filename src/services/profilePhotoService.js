const PROFILE_PHOTO_PREFIX =
  'djina-profile-photo'


function getPhotoKey(userId) {
  return `${PROFILE_PHOTO_PREFIX}:${userId || 'default'}`
}


export function getProfilePhoto(
  userId,
) {
  return localStorage.getItem(
    getPhotoKey(userId),
  )
}


export function saveProfilePhoto(
  userId,
  photo,
) {
  localStorage.setItem(
    getPhotoKey(userId),
    photo,
  )

  window.dispatchEvent(
    new CustomEvent(
      'djina:profile-photo-updated',
      {
        detail: {
          userId,
          photo,
        },
      },
    ),
  )
}


export function removeProfilePhoto(
  userId,
) {
  localStorage.removeItem(
    getPhotoKey(userId),
  )

  window.dispatchEvent(
    new CustomEvent(
      'djina:profile-photo-updated',
      {
        detail: {
          userId,
          photo: null,
        },
      },
    ),
  )
}


export function prepareProfilePhoto(
  file,
) {
  return new Promise(
    (
      resolve,
      reject,
    ) => {
      if (!file) {
        reject(
          new Error(
            'Aucun fichier sélectionné.',
          ),
        )

        return
      }

      if (
        !file.type.startsWith(
          'image/',
        )
      ) {
        reject(
          new Error(
            'Le fichier doit être une image.',
          ),
        )

        return
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        reject(
          new Error(
            'La photo ne doit pas dépasser 5 Mo.',
          ),
        )

        return
      }

      const reader =
        new FileReader()

      reader.onload =
        () => {
          const image =
            new Image()

          image.onload =
            () => {
              const size = 400

              const canvas =
                document.createElement(
                  'canvas',
                )

              canvas.width = size
              canvas.height = size

              const context =
                canvas.getContext(
                  '2d',
                )

              const sourceSize =
                Math.min(
                  image.width,
                  image.height,
                )

              const sourceX =
                (
                  image.width -
                  sourceSize
                ) / 2

              const sourceY =
                (
                  image.height -
                  sourceSize
                ) / 2

              context.drawImage(
                image,
                sourceX,
                sourceY,
                sourceSize,
                sourceSize,
                0,
                0,
                size,
                size,
              )

              const photo =
                canvas.toDataURL(
                  'image/jpeg',
                  0.86,
                )

              resolve(photo)
            }

          image.onerror =
            () => {
              reject(
                new Error(
                  'Impossible de lire cette image.',
                ),
              )
            }

          image.src =
            reader.result
        }

      reader.onerror =
        () => {
          reject(
            new Error(
              'Impossible de lire cette image.',
            ),
          )
        }

      reader.readAsDataURL(
        file,
      )
    },
  )
}