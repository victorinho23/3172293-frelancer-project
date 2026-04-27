// js/components/card.js
    // containerSelector: Es un selector css donde van las cards

    export async function loadCards(containerSelector, cardIds = []) {
        const container = document.querySelector(containerSelector);

        if(!container) return;

        try {
            // Hacemos dos fetch al mismo tiempo, uno para la plantilla y otro para los datos
            const[templateRes, dataRes,] = await Promise.all([
                fetch("/views/components/card.html"),
                fetch("/data/cards.json")
            ])

            const template = await templateRes.text()
             const cards = await dataRes.json()

        // Filtro por si se propporcionan ID

        const  filtredCards = cardIds.length ? cardIds.filter(card => cardIds.includes(card.id)) : cards;

        filtredCards.forEach(card =>{
            let html = template
            .replace("{{title}}", card.title)
            .replace("{{icon1}}", card.icon1)
            .replace("{{icon2}}", card.icon2)
            .replace("{{description}}", card.description)
    
            container.innerHTML += html
        })
            
            

        } catch (error) {
            console.log("Error cargando las cards", error)
        }
        
    }

