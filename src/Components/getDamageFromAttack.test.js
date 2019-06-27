import getDamageFromAttack from './getDamageFromAttack'

describe('getDamageFromAttacks', () => {
    describe('when enter example input', () => {
        it('should be return example output', () => {
            const input = {
                name: 'Pikachu',
                hp: 110,
                attacks: [
                  { name: 'attack A', damage: '20+'},
                  { name: 'attack B', damage: '40x'}
                ],
                weaknesses: [
                  { name: 'weakness A'},
                ]
              }
            const output = {
                hp: 100,
                atk: '100%',
                weak: '100%',
                damage: 60,
                level: -14.8
              }
            expect(getDamageFromAttack(input)).toEqual(output)
        })
    })
})