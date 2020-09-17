export default function characterFromObj(obj: object):Character {
    const jsonData = obj as any;

    return {
        slug: jsonData.slug,
        name: jsonData.name,
        house: jsonData.house,
        actor: jsonData.actor,
        alive: jsonData.alive,
        gender: jsonData.gender,
        image: jsonData.image,
    }
}