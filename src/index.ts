// script is deferred

const url: string = "http://localhost:3000/movies"
let movies: movie[] = []
let selectedMovie: movie

class movie {
    constructor(_id: number, _title: string, _releaseYear: number, _description: string, _image: string, _watched: boolean, _bloodAmount: number)
    {
        this.id = _id
        this.title = _title
        this.releaseYear = _releaseYear
        this.description = _description
        this.image = _image
        this.watched = _watched
        this.bloodAmount = _bloodAmount
    }

    id:number
    title: string
    releaseYear: number
    description: string
    image: string
    watched: boolean
    bloodAmount: number

    populateDetails: Function = () => {
        const detailImage: HTMLImageElement = document.getElementById("detail-image") as HTMLImageElement
        detailImage.src = this.image
        document.getElementById("title")!.textContent = this.title
        document.getElementById("year-released")!.textContent = this.releaseYear.toString()
        document.getElementById("description")!.textContent = this.description
        document.getElementById("watched")!.textContent = this.watched ? "Watched" : "Unwatched"
        document.getElementById("amount")!.textContent = this.bloodAmount.toString()
        selectedMovie = this
    }

    render: Function = () => {
        const navList: HTMLElement = document.getElementById("movie-list")!

        const newImg: HTMLImageElement = document.createElement("img")
        newImg.src = this.image
        newImg.addEventListener("click", (e) => {
            this.populateDetails()
        })

        navList.appendChild(newImg)
    }
}

const fetchMovies = () => {
fetch(url).
    then(res => res.json()).
    then(data => {
        movies = data.map( (m: any) => {
            const newMovie = new movie(m["id"], m["title"], m["release_year"], m["description"], m["image"], m["watched"], m["blood_amount"])
            newMovie.render()
            return newMovie
        })
        movies[0].populateDetails()
    })
    .catch(e => console.log(e))
}

fetchMovies()

document.getElementById("watched")!.addEventListener("click", (e) => {
    console.log(e)
    const btn: HTMLButtonElement = e.target as HTMLButtonElement
    if (btn.textContent === "Watched")
    {
        btn.textContent = "Unwatched"
        selectedMovie.watched = false
    }
    else
    {
        btn.textContent = "Watched"
        selectedMovie.watched = true
    }
})

document.getElementById("blood-form")!.addEventListener("submit", (e: any) => {
    e.preventDefault()
    const fd: FormData = e.target as FormData
    const addBlood: number = parseInt(fd["blood-amount"].value)
    selectedMovie.bloodAmount += addBlood
    document.getElementById("amount")!.textContent = selectedMovie.bloodAmount.toString()
})