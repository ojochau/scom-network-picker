import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
  $nest: {
    '::-webkit-scrollbar-track': {
      borderRadius: '12px',
      border: '1px solid transparent',
      backgroundColor: 'unset'
    },
    '::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: 'unset'
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '12px',
      background: 'rgba(0, 0, 0, 0.5) 0% 0% no-repeat padding-box'
    }
  }
})

export const buttonStyles = Styles.style({
  justifyContent: "space-between",
  $nest: {
    '&:hover': {
      border: `1px solid ${Theme.colors.primary.main}`
    }
  }
})

export const focusStyles = Styles.style({
  border: `1px solid ${Theme.colors.primary.main}`,
  boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
})

export const modalStyles = Styles.style({
  boxSizing: 'border-box',
  $nest: {
    '.i-modal_header': {
      borderRadius: '10px 10px 0 0',
      background: 'unset',
      borderBottom: `2px solid ${Theme.divider}`,
      padding: '1rem 0',
      fontWeight: 700,
      fontSize: '1rem'
    },
    '.list-view': {
      $nest: {
        '.list-item': {
          cursor: 'pointer',
          transition: 'all .3s ease-in',
          $nest: {
            '&.disabled': {
              cursor: 'default',
              $nest: {
                '&:hover > *': {
                  opacity: '0.75 !important',
                }
              }
            }
          }
        },
        '&.is-button': {
          $nest: {
            '.is-active': {
              $nest: {
                '> *': {
                  opacity: 1
                },
                '&:after': {
                  content: "''",
                  top: '50%',
                  left: 12,
                  position: 'absolute',
                  background: Theme.colors.success.main,
                  borderRadius: '50%',
                  width: 10,
                  height: 10,
                  transform: 'translate3d(-50%,-50%,0)'
                }
              }
            },
            '.list-item': {
              $nest: {
                '> *': {
                  opacity: .75
                }
              }
            },
            '.list-item:not(.is-active):hover': {
              $nest: {
                '> *': {
                  opacity: 1
                }
              }
            }
          }
        },
        '&.is-combobox': {
          $nest: {
            '.is-active': {
              background: Theme.action.activeBackground,
              fontWeight: 600
            },
            '.list-item:not(.is-active):hover': {
              background: Theme.action.hoverBackground
            }
          }
        }
      }
    },
    '&> div': {
      transform: 'scale(1)'
    }
  }
})

export const fullWidthStyles = Styles.style({
  width: '100%'
})