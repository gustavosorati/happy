import Image from "../../core/entitys/Image";

export const imageView = {
  render(orphanage: Image) {
    return {
      id: orphanage.id,
      url: `http://localhost:3333/uploads/${orphanage.path}`
    }
  },

  renderMany(orphanages: Image[]) {
    return orphanages.map(image => this.render(image))
  }
}