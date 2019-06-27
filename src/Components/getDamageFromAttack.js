export default function (input) {

    let hp = input.hp === 'None' ? 0 : input.hp
    hp = hp > 100 ? 100 : hp
    
    let damage = input.attacks === undefined ? 0 : input.attacks.reduce(function(acc, curr) {
        return acc + Number(curr.damage.substring(0, curr.damage.length - 1));
    },0)
    let weak = input.weaknesses === undefined ? 0 : input.weaknesses.length*100

    return {
        hp: hp,
        atk: input.attacks === undefined ? 0 : input.attacks.length * 50,
        damage: damage,
        weak: weak,
        level: (((hp / 10) + (damage /10 ) + 10 - (weak)) / 5) === undefined ? 0 : (((hp / 10) + (damage /10 ) + 10 - (weak)) / 5)

    }
}